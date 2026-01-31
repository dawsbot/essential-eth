import {
  decodeRPCResponse,
  encodeData,
} from '../classes/utils/encode-decode-transaction';
import type { JSONABI, JSONABIArgument } from '../types/Contract.types';

/**
 * Find a function ABI entry by name. Throws if not found.
 * @param abi
 * @param functionName
 */
function findFunctionABI(abi: JSONABI, functionName: string): JSONABIArgument {
  const entry = abi.find(
    (item) => item.type === 'function' && item.name === functionName,
  );
  if (!entry) {
    throw new Error(`Function "${functionName}" not found in ABI`);
  }
  return entry;
}

/**
 * Encode function call data from a full ABI, function name, and arguments.
 * @param abi The full JSON ABI array of the contract
 * @param functionName The name of the function to encode
 * @param args The arguments to pass to the function
 * @returns The ABI-encoded hex string (with 0x prefix and 4-byte selector)
 * @example
 * ```typescript
 * import { encodeFunctionData } from 'essential-eth';
 *
 * const abi = [
 *   {
 *     name: 'balanceOf',
 *     type: 'function',
 *     inputs: [{ name: 'owner', type: 'address' }],
 *     outputs: [{ name: 'balance', type: 'uint256' }],
 *   },
 * ];
 *
 * const data = encodeFunctionData(abi, 'balanceOf', [
 *   '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
 * ]);
 * ```
 */
export function encodeFunctionData(
  abi: JSONABI,
  functionName: string,
  args: any[] = [],
): string {
  const abiEntry = findFunctionABI(abi, functionName);
  return encodeData(abiEntry, args);
}

/**
 * Decode the result of a contract function call.
 * @param abi The full JSON ABI array of the contract
 * @param functionName The name of the function whose result to decode
 * @param data The hex-encoded return data from the RPC call
 * @returns The decoded value(s). Returns a single value if only one output, otherwise an array.
 * @example
 * ```typescript
 * import { decodeFunctionResult } from 'essential-eth';
 *
 * const abi = [
 *   {
 *     name: 'balanceOf',
 *     type: 'function',
 *     inputs: [{ name: 'owner', type: 'address' }],
 *     outputs: [{ name: 'balance', type: 'uint256' }],
 *   },
 * ];
 *
 * const result = decodeFunctionResult(abi, 'balanceOf', '0x000...0001');
 * // result === 1n
 * ```
 */
export function decodeFunctionResult(
  abi: JSONABI,
  functionName: string,
  data: string,
): any {
  const abiEntry = findFunctionABI(abi, functionName);
  return decodeRPCResponse(abiEntry, data);
}
