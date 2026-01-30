import { describe, expect, it } from 'vitest';
import { jsonRpcProvider } from '../..';
import { rpcUrls } from './rpc-urls';

// These are integration tests that require network access.
// They will call the ENS Registry and resolver contracts on mainnet.
describe('provider.resolveName', () => {
  const provider = jsonRpcProvider(rpcUrls.mainnet);

  it('should resolve vitalik.eth to the correct address', async () => {
    const address = await provider.resolveName('vitalik.eth');
    expect(address).toBe('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
  });

  it('should resolve daws.eth to a valid address', async () => {
    const address = await provider.resolveName('daws.eth');
    expect(address).not.toBeNull();
    expect(address).toMatch(/^0x[0-9a-fA-F]{40}$/);
  });

  it('should return null for a non-existent name', async () => {
    const address = await provider.resolveName(
      'thisshouldnotexist12345.eth',
    );
    expect(address).toBeNull();
  });
});
