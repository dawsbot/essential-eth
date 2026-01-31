import { describe, expect, it } from 'vitest';
import type { JSONABI } from '../../types/Contract.types';
import { getEventSignature, getEventTopic } from '../event-topic';

describe('getEventTopic', () => {
  it('should return the correct topic for Transfer(address,address,uint256)', () => {
    expect(getEventTopic('Transfer(address,address,uint256)')).toBe(
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    );
  });

  it('should return the correct topic for Approval(address,address,uint256)', () => {
    expect(getEventTopic('Approval(address,address,uint256)')).toBe(
      '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
    );
  });
});

describe('getEventSignature', () => {
  const erc20Abi: JSONABI = [
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
  ];

  it('should compute the Transfer topic from an ERC20 ABI', () => {
    expect(getEventSignature(erc20Abi, 'Transfer')).toBe(
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    );
  });

  it('should compute the Approval topic from an ERC20 ABI', () => {
    expect(getEventSignature(erc20Abi, 'Approval')).toBe(
      '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
    );
  });

  it('should throw when the event name is not found', () => {
    expect(() => getEventSignature(erc20Abi, 'NonExistent')).toThrow(
      'Event "NonExistent" not found in ABI',
    );
  });
});
