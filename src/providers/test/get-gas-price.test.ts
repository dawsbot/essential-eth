import { ethers } from 'ethers';
import { JsonRpcProvider } from '../..';
import { rpcUrls } from './rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getGasPrice', () => {
  it('should match ethers and essential-eth', async () => {
    const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    const [ethersGasPrice, essentialEthGasPrice] = await Promise.all([
      ethersProvider.getGasPrice(),
      essentialEthProvider.getGasPrice(),
    ]);
    expect(ethersGasPrice.toNumber()).toBe(essentialEthGasPrice.toNumber());
  });
});
