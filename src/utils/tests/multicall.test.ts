import { describe, expect, it, vi } from 'vitest';
import type { JSONABI } from '../../types/Contract.types';
import { multicall, multicallSameContract } from '../multicall';

// --- Test ABIs ---

const boolAbi: JSONABI = [
  {
    inputs: [
      { name: 'index', type: 'uint256' },
    ],
    name: 'isClaimed',
    outputs: [
      { name: '', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const uint256Abi: JSONABI = [
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      { name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const balanceOfAbi: JSONABI = [
  {
    inputs: [
      { name: 'account', type: 'address' },
    ],
    name: 'balanceOf',
    outputs: [
      { name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const combinedAbi: JSONABI = [
  ...uint256Abi,
  ...balanceOfAbi,
];

// --- Helper: build a mock aggregate3 response ---

/**
 * Builds an ABI-encoded aggregate3 response: `(bool, bytes)[]`
 *
 * Layout (all values in 32-byte words):
 *  - offset to array data (0x20)
 *  - array length
 *  - per-element offset pointers (relative to element-offset area)
 *  - per-element: (bool success, offset-to-bytes, bytes-length, bytes-data-padded)
 */
function buildAggregate3Response(
  results: { success: boolean; returnData: string }[],
): string {
  const word = (n: number) => n.toString(16).padStart(64, '0');
  const boolWord = (b: boolean) => (b ? '0'.repeat(63) + '1' : '0'.repeat(64));

  let hex = '';

  // Offset to array
  hex += word(32);

  // Array length
  hex += word(results.length);

  // Each tuple is dynamic, so we emit offsets then data
  // Encode each tuple first so we know their sizes
  const encodedTuples: string[] = results.map((r) => {
    const rawBytes = r.returnData.replace(/^0x/, '');
    const paddedBytes = rawBytes.length > 0
      ? rawBytes.padEnd(Math.ceil(rawBytes.length / 64) * 64, '0')
      : '';

    return (
      boolWord(r.success) +                     // success
      word(2 * 32) +                             // offset to bytes within tuple (0x40)
      word(rawBytes.length / 2) +                // bytes length
      paddedBytes                                // bytes data
    );
  });

  // Offsets (relative to start of element-offset area)
  let currentOffset = results.length * 32; // skip past all offset slots
  for (let i = 0; i < encodedTuples.length; i++) {
    hex += word(currentOffset);
    currentOffset += encodedTuples[i].length / 2;
  }

  // Tuple data
  hex += encodedTuples.join('');

  return '0x' + hex;
}

// --- Tests ---

describe('multicall', () => {
  it('correctly encodes calls and decodes successful results', async () => {
    // Mock response: isClaimed → true, totalSupply → 42
    const mockResponse = buildAggregate3Response([
      {
        success: true,
        // ABI-encoded bool true
        returnData: '0x' + '0'.repeat(63) + '1',
      },
      {
        success: true,
        // ABI-encoded uint256 42 (0x2a)
        returnData: '0x' + '0'.repeat(62) + '2a',
      },
    ]);

    const mockProvider = {
      call: vi.fn().mockResolvedValue(mockResponse),
    };

    const results = await multicall(mockProvider, [
      {
        target: '0x090D4613473dEE047c3f2706764f49E0821D256e',
        abi: boolAbi,
        functionName: 'isClaimed',
        args: [0],
      },
      {
        target: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        abi: uint256Abi,
        functionName: 'totalSupply',
      },
    ]);

    // Verify provider.call was called once (batched)
    expect(mockProvider.call).toHaveBeenCalledTimes(1);

    // Verify the call was to the Multicall3 address
    const callArgs = mockProvider.call.mock.calls[0];
    expect(callArgs[0].to).toBe(
      '0xca11bde05977b3631167028862be2a173976ca11',
    );
    expect(callArgs[1]).toBe('latest');

    // Verify results
    expect(results).toHaveLength(2);
    expect(results[0]).toEqual({ success: true, data: true });
    expect(results[1]).toEqual({ success: true, data: BigInt(42) });
  });

  it('handles failed calls returning { success: false, data: null }', async () => {
    const mockResponse = buildAggregate3Response([
      {
        success: true,
        // ABI-encoded bool true
        returnData: '0x' + '0'.repeat(63) + '1',
      },
      {
        success: false,
        // Empty return data for failed call
        returnData: '0x',
      },
    ]);

    const mockProvider = {
      call: vi.fn().mockResolvedValue(mockResponse),
    };

    const results = await multicall(mockProvider, [
      {
        target: '0x090D4613473dEE047c3f2706764f49E0821D256e',
        abi: boolAbi,
        functionName: 'isClaimed',
        args: [0],
      },
      {
        target: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
        abi: uint256Abi,
        functionName: 'totalSupply',
      },
    ]);

    expect(results).toHaveLength(2);
    expect(results[0]).toEqual({ success: true, data: true });
    expect(results[1]).toEqual({ success: false, data: null });
  });

  it('throws when function name is not found in ABI', async () => {
    const mockProvider = {
      call: vi.fn(),
    };

    await expect(
      multicall(mockProvider, [
        {
          target: '0x090D4613473dEE047c3f2706764f49E0821D256e',
          abi: boolAbi,
          functionName: 'nonExistentFunction',
        },
      ]),
    ).rejects.toThrow('Function "nonExistentFunction" not found in ABI');
  });

  it('encodes call data in the aggregate3 payload', async () => {
    const mockResponse = buildAggregate3Response([
      {
        success: true,
        returnData: '0x' + '0'.repeat(63) + '1',
      },
    ]);

    const mockProvider = {
      call: vi.fn().mockResolvedValue(mockResponse),
    };

    await multicall(mockProvider, [
      {
        target: '0x090D4613473dEE047c3f2706764f49E0821D256e',
        abi: boolAbi,
        functionName: 'isClaimed',
        args: [0],
      },
    ]);

    // The call data sent to the provider should start with the aggregate3 selector
    const callData = mockProvider.call.mock.calls[0][0].data as string;
    expect(callData).toMatch(/^0x[0-9a-f]+$/); // valid hex
    // aggregate3 selector is the first 10 chars (0x + 8 hex)
    expect(callData.length).toBeGreaterThan(10);
  });
});

describe('multicallSameContract', () => {
  it('batches multiple function calls to the same contract', async () => {
    const contractAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
    const account = '0x71660c4005BA85c37ccec55d0C4493E66Fe775d3';

    const mockResponse = buildAggregate3Response([
      {
        success: true,
        // ABI-encoded uint256 1000000 (0xF4240)
        returnData: '0x' + '0'.repeat(59) + 'f4240',
      },
      {
        success: true,
        // ABI-encoded uint256 500 (0x1F4)
        returnData: '0x' + '0'.repeat(61) + '1f4',
      },
    ]);

    const mockProvider = {
      call: vi.fn().mockResolvedValue(mockResponse),
    };

    const results = await multicallSameContract(
      mockProvider,
      contractAddress,
      combinedAbi,
      [
        { functionName: 'totalSupply' },
        { functionName: 'balanceOf', args: [account] },
      ],
    );

    // Single RPC call
    expect(mockProvider.call).toHaveBeenCalledTimes(1);

    // Verify results
    expect(results).toHaveLength(2);
    expect(results[0]).toEqual({ success: true, data: BigInt(1000000) });
    expect(results[1]).toEqual({ success: true, data: BigInt(500) });
  });

  it('handles mixed success and failure in same-contract calls', async () => {
    const contractAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

    const mockResponse = buildAggregate3Response([
      {
        success: true,
        returnData: '0x' + '0'.repeat(59) + 'f4240',
      },
      {
        success: false,
        returnData: '0x',
      },
    ]);

    const mockProvider = {
      call: vi.fn().mockResolvedValue(mockResponse),
    };

    const results = await multicallSameContract(
      mockProvider,
      contractAddress,
      combinedAbi,
      [
        { functionName: 'totalSupply' },
        { functionName: 'balanceOf', args: ['0x0000000000000000000000000000000000000000'] },
      ],
    );

    expect(results).toHaveLength(2);
    expect(results[0]).toEqual({ success: true, data: BigInt(1000000) });
    expect(results[1]).toEqual({ success: false, data: null });
  });
});
