import { describe, expect, it } from 'vitest';
import { decodeEventLog } from '../decode-event-log';
import type { JSONABI } from '../../types/Contract.types';

const erc20ABI: JSONABI = [
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
  },
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
];

describe('decodeEventLog', () => {
  it('decodes an ERC20 Transfer event log', () => {
    // Transfer(address indexed from, address indexed to, uint256 value)
    // topic0 = keccak256("Transfer(address,address,uint256)")
    const result = decodeEventLog(erc20ABI, {
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x000000000000000000000000abc0000000000000000000000000000000000001',
        '0x000000000000000000000000abc0000000000000000000000000000000000002',
      ],
      data: '0x0000000000000000000000000000000000000000000000000000000000000064',
    });

    expect(result.eventName).toBe('Transfer');
    expect(result.args.from).toBe(
      '0xABC0000000000000000000000000000000000001',
    );
    expect(result.args.to).toBe(
      '0xaBc0000000000000000000000000000000000002',
    );
    expect(result.args.value).toBe(BigInt(100));
  });

  it('decodes an ERC20 Approval event log', () => {
    // Approval(address indexed owner, address indexed spender, uint256 value)
    // topic0 = keccak256("Approval(address,address,uint256)")
    const result = decodeEventLog(erc20ABI, {
      topics: [
        '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
        '0x000000000000000000000000aaaa000000000000000000000000000000000001',
        '0x000000000000000000000000bbbb000000000000000000000000000000000002',
      ],
      data: '0x00000000000000000000000000000000000000000000000000000000000003e8',
    });

    expect(result.eventName).toBe('Approval');
    expect(result.args.owner).toBe(
      '0xAAaA000000000000000000000000000000000001',
    );
    expect(result.args.spender).toBe(
      '0xBbbb000000000000000000000000000000000002',
    );
    expect(result.args.value).toBe(BigInt(1000));
  });

  it('throws error when no matching event found', () => {
    const unknownTopic =
      '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

    expect(() =>
      decodeEventLog(erc20ABI, {
        topics: [unknownTopic],
        data: '0x',
      }),
    ).toThrow(`No matching event found in ABI for topic0: ${unknownTopic}`);
  });
});
