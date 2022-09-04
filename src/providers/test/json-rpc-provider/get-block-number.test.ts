import { StaticJsonRpcProvider } from '@ethersproject/providers';
import Web3 from 'web3';
import { JsonRpcProvider } from '../../../index';

// RSK has 30 second block times so tests pass more often
const rpcUrl = `https://public-node.rsk.co`;

describe('provider.getBlockNumber', () => {
  it('should match ethers.js', async () => {
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    const ethersProvider = new StaticJsonRpcProvider(rpcUrl);
    const [essentialEthBlockNumber, ethersBlockNumber] = await Promise.all([
      essentialEthProvider.getBlockNumber(),
      ethersProvider.getBlockNumber(),
    ]);
    // allow one-block flexibility because of timing of requests
    expect(Math.abs(essentialEthBlockNumber - ethersBlockNumber)).toBeLessThan(
      2,
    );
  });
  it('should match web3.js', async () => {
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    const web3Provider = new Web3(rpcUrl);
    const [essentialEthBlockNumber, web3BlockNumber] = await Promise.all([
      essentialEthProvider.getBlockNumber(),
      web3Provider.eth.getBlockNumber(),
    ]);
    expect(essentialEthBlockNumber).toStrictEqual(web3BlockNumber);
  });
});
