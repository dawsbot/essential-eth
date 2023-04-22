import dotenv from 'dotenv';
import { z } from 'zod';
import { AlchemyProvider, TinyBig } from '../../index';
dotenv.config();

const apiKey = process.env.ALCHEMY_API_KEY;

if (!apiKey) {
  throw new Error(
    'ALCHEMY_API_KEY is not defined in the environment variables.',
  );
}

const provider = new AlchemyProvider(apiKey);

describe('alchemyProvider.getGasPrice', () => {
  it('should return the current gas price', async () => {
    const gasPrice = await provider.getGasPrice();
    expect(z.instanceof(TinyBig).safeParse(gasPrice).success).toBe(true);
  });
});
