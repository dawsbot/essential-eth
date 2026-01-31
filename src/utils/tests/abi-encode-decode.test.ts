import { describe, expect, it } from 'vitest';
import type { JSONABI } from '../../types/Contract.types';
import { decodeFunctionResult, encodeFunctionData } from '../abi-encode-decode';

const erc20ABI: JSONABI = [
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    name: 'transfer',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
];

describe('encodeFunctionData', () => {
  it('encodes balanceOf(address)', () => {
    const data = encodeFunctionData(erc20ABI, 'balanceOf', [
      '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    ]);
    // keccak256("balanceOf(address)") first 4 bytes = 70a08231
    expect(data).toMatch(/^0x70a08231/);
    // address should be left-padded to 32 bytes (64 hex chars)
    expect(data.length).toBe(2 + 8 + 64); // 0x + selector + 1 arg
    // address is lowercase in the encoded output
    expect(data.toLowerCase()).toContain(
      'd8da6bf26964af9d7eed9e03e53415d37aa96045',
    );
  });

  it('encodes transfer(address, uint256)', () => {
    const data = encodeFunctionData(erc20ABI, 'transfer', [
      '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      BigInt('1000000000000000000'), // 1 ETH in wei
    ]);
    // keccak256("transfer(address,uint256)") first 4 bytes = a9059cbb
    expect(data).toMatch(/^0xa9059cbb/);
    // selector (8) + address (64) + uint256 (64) = 136 hex chars + "0x"
    expect(data.length).toBe(2 + 8 + 64 + 64);
  });

  it('throws for a function not in the ABI', () => {
    expect(() => encodeFunctionData(erc20ABI, 'approve', [])).toThrowError(
      'Function "approve" not found in ABI',
    );
  });
});

describe('decodeFunctionResult', () => {
  it('decodes a uint256 balanceOf result', () => {
    // 1000 in hex, padded to 32 bytes
    const hexResult =
      '0x00000000000000000000000000000000000000000000000000000000000003e8';
    const result = decodeFunctionResult(erc20ABI, 'balanceOf', hexResult);
    expect(result).toBe(BigInt(1000));
  });

  it('decodes a bool transfer result (true)', () => {
    const hexTrue =
      '0x0000000000000000000000000000000000000000000000000000000000000001';
    const result = decodeFunctionResult(erc20ABI, 'transfer', hexTrue);
    expect(result).toBe(true);
  });

  it('decodes a bool transfer result (false)', () => {
    const hexFalse =
      '0x0000000000000000000000000000000000000000000000000000000000000000';
    const result = decodeFunctionResult(erc20ABI, 'transfer', hexFalse);
    expect(result).toBe(false);
  });

  it('throws for a function not in the ABI', () => {
    expect(() =>
      decodeFunctionResult(erc20ABI, 'approve', '0x00'),
    ).toThrowError('Function "approve" not found in ABI');
  });
});
