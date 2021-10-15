import { ethers } from 'ethers';
import { JsonRpcProvider } from '../..';

const maticRPCUrl = 'http://localhost:3000/api/matic';
const xdaiRPCUrl = 'http://localhost:3000/api/xdai';
const bscRPCUrl = 'http://localhost:3000/api/bsc';
const kovanRPCUrl = 'http://localhost:3000/api/kovan';

describe('get-network', () => {
  async function testNetwork(rpcUrl: string) {
    const essentialEth = new JsonRpcProvider(rpcUrl);
    const ethersProvider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const [eeNetwork, ethersNetwork] = await Promise.all([
      essentialEth.getNetwork(),
      ethersProvider.getNetwork(),
    ]);

    expect(eeNetwork.chainId).toBe(ethersNetwork.chainId);
    expect(eeNetwork.ensAddress).toBe(ethersNetwork.ensAddress);
    expect(eeNetwork.name).toBe(ethersNetwork.name);
  }
  it('matic should match ethers', async () => {
    await testNetwork(maticRPCUrl);
  });
  it('xdai should match ethers', async () => {
    await testNetwork(xdaiRPCUrl);
  });
  it('bsc should match ethers', async () => {
    await testNetwork(bscRPCUrl);
  });
  /* ethers returns "kovan", essential-eth returns "kov" */
  // it('kovan should match ethers', async () => {
  //   await testNetwork(kovanRPCUrl);
  // });
});
