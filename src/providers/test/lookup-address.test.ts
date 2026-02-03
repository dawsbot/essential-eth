import { describe, expect, it } from 'vitest';
import { jsonRpcProvider } from '../..';
import { rpcUrls } from './rpc-urls';

// These are integration tests that require network access.
// They will call the ENS Registry and resolver contracts on mainnet.
describe('provider.lookupAddress', () => {
  const provider = jsonRpcProvider(rpcUrls.mainnet);

  it('should resolve vitalik.eth address to the correct name', async () => {
    const name = await provider.lookupAddress(
      '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    );
    expect(name).toBe('vitalik.eth');
  });

  it('should return null for an address without a reverse record', async () => {
    // Using a random address that shouldn't have a reverse record
    const name = await provider.lookupAddress(
      '0x0000000000000000000000000000000000000001',
    );
    expect(name).toBeNull();
  });

  it('should handle lowercase addresses', async () => {
    const name = await provider.lookupAddress(
      '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    );
    expect(name).toBe('vitalik.eth');
  });

  it('should handle mixed case addresses', async () => {
    const name = await provider.lookupAddress(
      '0xD8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    );
    expect(name).toBe('vitalik.eth');
  });

  it('should verify forward resolution matches (ENSIP-3)', async () => {
    const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    const name = await provider.lookupAddress(address);
    expect(name).not.toBeNull();

    // Verify that the name resolves back to the same address
    if (name) {
      const verifiedAddress = await provider.resolveName(name);
      expect(verifiedAddress?.toLowerCase()).toBe(address.toLowerCase());
    }
  });
});
