import { describe, expect, it } from 'vitest';
import { AlchemyProvider } from '../../index';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

if (!ALCHEMY_API_KEY) {
  throw new Error(
    'ALCHEMY_API_KEY is not defined in the environment variables.',
  );
}

const provider = new AlchemyProvider(ALCHEMY_API_KEY);

describe('alchemyProvider.getGasPrice', () => {
  it('should return the current gas price as bigint', async () => {
    const gasPrice = await provider.getGasPrice();
    expect(typeof gasPrice).toBe('bigint');
  });
});
