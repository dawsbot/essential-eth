import { describe, expect, it } from 'vitest';
import { namehash } from '../namehash';

describe('namehash', () => {
  it('should return zero hash for empty string', () => {
    expect(namehash('')).toBe(
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    );
  });

  it('should hash "eth" correctly', () => {
    expect(namehash('eth')).toBe(
      '0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae',
    );
  });

  it('should hash "vitalik.eth" correctly', () => {
    expect(namehash('vitalik.eth')).toBe(
      '0xee6c4522aab0003e8d14cd40a6af439055fd2577951148c14b6cea9a53475835',
    );
  });

  it('should hash "foo.eth" correctly', () => {
    // Known EIP-137 test vector
    expect(namehash('foo.eth')).toBe(
      '0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f',
    );
  });

  it('should handle deeply nested names', () => {
    const hash = namehash('sub.vitalik.eth');
    // Should be a valid 32-byte hex string
    expect(hash).toMatch(/^0x[0-9a-f]{64}$/);
    // Should differ from vitalik.eth
    expect(hash).not.toBe(namehash('vitalik.eth'));
  });
});
