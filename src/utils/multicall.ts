import { keccak_256 } from '@noble/hashes/sha3.js';
import { bytesToHex } from '@noble/hashes/utils.js';
import {
  decodeRPCResponse,
  encodeData,
} from '../classes/utils/encode-decode-transaction';
import type { JSONABI, JSONABIArgument } from '../types/Contract.types';

/**
 * Multicall3 is deployed at the same address on all major EVM chains.
 * @see https://www.multicall3.com/
 */
const MULTICALL3_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';

/**
 * Function selector for aggregate3((address,bool,bytes)[])
 * Computed as the first 4 bytes of keccak256("aggregate3((address,bool,bytes)[])")
 */
const AGGREGATE3_SELECTOR = (() => {
  const hash = bytesToHex(
    keccak_256(
      new TextEncoder().encode('aggregate3((address,bool,bytes)[])'),
    ),
  );
  return hash.slice(0, 8);
})();

/**
 * A single call to include in a multicall batch.
 */
export interface MulticallCall {
  /** The target contract address */
  target: string;
  /** The JSON ABI of the target contract (or at least the entry for the function being called) */
  abi: JSONABI;
  /** The name of the function to call */
  functionName: string;
  /** The arguments to pass to the function */
  args?: any[];
}

/**
 * The result of a single call within a multicall batch.
 */
export interface MulticallResult {
  /** Whether the call succeeded */
  success: boolean;
  /** The decoded return data, or null if the call failed */
  data: any;
}

/**
 * Minimal provider interface for multicall — compatible with JsonRpcProvider, FallthroughProvider, etc.
 */
interface MulticallProvider {
  call(
    transaction: { to?: string; data?: any },
    blockTag?: string | number,
  ): Promise<string>;
}

/**
 * Encode a single aggregate3 call tuple (address, bool, bytes).
 * @internal
 */
function encodeTuple(
  target: string,
  allowFailure: boolean,
  callData: string,
): string {
  // address: left-padded to 32 bytes
  const addressHex = target.replace(/^0x/, '').toLowerCase().padStart(64, '0');
  // bool: 32 bytes
  const boolHex = allowFailure ? '0'.repeat(63) + '1' : '0'.repeat(64);
  // bytes is dynamic — offset pointer within the tuple
  // 3 head slots (address, bool, bytes-offset) × 32 bytes = 96 = 0x60
  const bytesOffset = (3 * 32).toString(16).padStart(64, '0');
  // bytes data
  const rawBytes = callData.replace(/^0x/, '');
  const bytesLength = (rawBytes.length / 2).toString(16).padStart(64, '0');
  const paddedBytes = rawBytes.padEnd(
    Math.ceil(rawBytes.length / 64) * 64,
    '0',
  );

  return addressHex + boolHex + bytesOffset + bytesLength + paddedBytes;
}

/**
 * Encode the full aggregate3 call data (function selector + ABI-encoded parameters).
 * @internal
 */
function encodeAggregate3(
  calls: { target: string; allowFailure: boolean; callData: string }[],
): string {
  // Function selector
  let result = AGGREGATE3_SELECTOR;

  // The input is a dynamic array — first word is the offset to array data (0x20 = 32)
  result += (32).toString(16).padStart(64, '0');

  // Array length
  result += calls.length.toString(16).padStart(64, '0');

  // Each tuple is dynamic (contains `bytes`), so we emit offset pointers first, then data
  const encodedTuples: string[] = calls.map((call) =>
    encodeTuple(call.target, call.allowFailure, call.callData),
  );

  // Offsets are relative to the start of the element-offset area (right after the length word)
  let currentOffset = calls.length * 32; // skip past all offset slots
  const offsets: string[] = [];
  for (let i = 0; i < encodedTuples.length; i++) {
    offsets.push(currentOffset.toString(16).padStart(64, '0'));
    currentOffset += encodedTuples[i].length / 2; // hex chars → bytes
  }

  result += offsets.join('');
  result += encodedTuples.join('');

  return '0x' + result;
}

/**
 * Decode the aggregate3 response — an ABI-encoded `(bool, bytes)[]`.
 * @internal
 */
function decodeAggregate3Response(
  response: string,
): { success: boolean; returnData: string }[] {
  const data = response.replace(/^0x/, '');

  // First 32 bytes: offset to array data (in bytes), convert to hex-char offset
  const arrayOffset = parseInt(data.slice(0, 64), 16) * 2;

  // At arrayOffset: array length
  const arrayLength = parseInt(
    data.slice(arrayOffset, arrayOffset + 64),
    16,
  );

  const results: { success: boolean; returnData: string }[] = [];

  for (let i = 0; i < arrayLength; i++) {
    // Offset slot for element i (relative to element-offset area start)
    const offsetSlot = arrayOffset + 64 + i * 64;
    const tupleOffset =
      arrayOffset +
      64 +
      parseInt(data.slice(offsetSlot, offsetSlot + 64), 16) * 2;

    // Tuple: (bool success, bytes returnData)
    // success (32 bytes)
    const success =
      data.slice(tupleOffset, tupleOffset + 64) === '0'.repeat(63) + '1';

    // offset to bytes within this tuple (32 bytes)
    const bytesOffset =
      parseInt(data.slice(tupleOffset + 64, tupleOffset + 128), 16) * 2;
    const bytesStart = tupleOffset + bytesOffset;

    // bytes: length (32 bytes) + data
    const bytesLength = parseInt(data.slice(bytesStart, bytesStart + 64), 16);
    const returnData =
      bytesLength > 0
        ? '0x' + data.slice(bytesStart + 64, bytesStart + 64 + bytesLength * 2)
        : '0x';

    results.push({ success, returnData });
  }

  return results;
}

/**
 * Batch multiple contract read calls into a single RPC request via Multicall3's `aggregate3`.
 *
 * Reduces the number of RPC round-trips from N to 1 when reading from multiple contracts
 * (or multiple functions on the same contract).
 *
 * @param provider An essential-eth provider (JsonRpcProvider, FallthroughProvider, etc.)
 * @param calls Array of calls to batch — each specifies a target address, ABI, function name, and optional args
 * @returns Array of results in the same order as the input calls
 *
 * @example
 * ```typescript
 * import { JsonRpcProvider, multicall } from 'essential-eth';
 *
 * const provider = new JsonRpcProvider('https://free-eth-node.com/api/eth');
 * const results = await multicall(provider, [
 *   {
 *     target: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
 *     abi: daiAbi,
 *     functionName: 'balanceOf',
 *     args: ['0x...'],
 *   },
 *   {
 *     target: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
 *     abi: daiAbi,
 *     functionName: 'totalSupply',
 *   },
 * ]);
 * // results[0] = { success: true, data: 1000000000000000000n }
 * // results[1] = { success: true, data: 5000000000000000000000000n }
 * ```
 */
export async function multicall(
  provider: MulticallProvider,
  calls: MulticallCall[],
): Promise<MulticallResult[]> {
  // Find the ABI entry for each call and encode the call data
  const encodedCalls = calls.map((call) => {
    const abiEntry = call.abi.find(
      (entry) => entry.type === 'function' && entry.name === call.functionName,
    );
    if (!abiEntry) {
      throw new Error(`Function "${call.functionName}" not found in ABI`);
    }
    const callData = encodeData(
      abiEntry as JSONABIArgument,
      call.args || [],
    );
    return {
      target: call.target,
      allowFailure: true,
      callData,
    };
  });

  // Encode the full aggregate3 call
  const data = encodeAggregate3(encodedCalls);

  // Send the batched call via eth_call
  const response = await provider.call(
    {
      to: MULTICALL3_ADDRESS.toLowerCase(),
      data,
    },
    'latest',
  );

  // Decode the aggregate response, then decode each individual result
  const rawResults = decodeAggregate3Response(response);

  return rawResults.map((result, i) => {
    if (!result.success) {
      return { success: false, data: null };
    }

    const abiEntry = calls[i].abi.find(
      (entry) =>
        entry.type === 'function' && entry.name === calls[i].functionName,
    ) as JSONABIArgument;

    try {
      const decoded = decodeRPCResponse(abiEntry, result.returnData);
      return { success: true, data: decoded };
    } catch {
      return { success: false, data: null };
    }
  });
}

/**
 * Convenience function for calling multiple functions on the same contract via Multicall3.
 *
 * @param provider An essential-eth provider
 * @param contractAddress The address of the target contract
 * @param abi The JSON ABI of the target contract
 * @param calls Array of function calls — each specifies a function name and optional args
 * @returns Array of results in the same order as the input calls
 *
 * @example
 * ```typescript
 * import { JsonRpcProvider, multicallSameContract } from 'essential-eth';
 *
 * const provider = new JsonRpcProvider('https://free-eth-node.com/api/eth');
 * const results = await multicallSameContract(
 *   provider,
 *   '0x6B175474E89094C44Da98b954EedeAC495271d0F',
 *   daiAbi,
 *   [
 *     { functionName: 'name' },
 *     { functionName: 'symbol' },
 *     { functionName: 'decimals' },
 *     { functionName: 'balanceOf', args: ['0x...'] },
 *   ],
 * );
 * ```
 */
export async function multicallSameContract(
  provider: MulticallProvider,
  contractAddress: string,
  abi: JSONABI,
  calls: { functionName: string; args?: any[] }[],
): Promise<MulticallResult[]> {
  return multicall(
    provider,
    calls.map((call) => ({
      target: contractAddress,
      abi,
      functionName: call.functionName,
      args: call.args,
    })),
  );
}
