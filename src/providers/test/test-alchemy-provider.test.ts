import { describe, expect, it } from 'vitest';
import { AlchemyProvider } from '../../index';
import { skipWithoutAlchemyKey } from './rpc-urls';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const provider = ALCHEMY_API_KEY ? new AlchemyProvider(ALCHEMY_API_KEY) : null;

describe.skipIf(skipWithoutAlchemyKey)('alchemyProvider.getGasPrice', () => {
  it('should return the current gas price as bigint', async () => {
    const gasPrice = await provider.getGasPrice();
    expect(typeof gasPrice).toBe('bigint');
  });
});
