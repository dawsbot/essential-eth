import { AlchemyProvider } from '../../index';
import dotenv from 'dotenv';
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
    expect(gasPrice).toBeDefined();
  });
});
