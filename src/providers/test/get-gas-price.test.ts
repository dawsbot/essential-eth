import { ethers } from 'ethers';
import { JsonRpcProvider } from '../..';

const rpcUrl = `${process.env.RPC_ORIGIN}/api/eth`;

describe('provider.getGasPrice', () => {
  it('should match ethers and essential-eth', async () => {
    const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    const ethersGasPrice = await ethersProvider.getGasPrice();
    const essentialEthGasPrice = await essentialEthProvider.getGasPrice();
    expect(ethersGasPrice.toNumber()).toBe(essentialEthGasPrice.toNumber());
  });
});
