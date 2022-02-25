import { ethers } from 'ethers';
import { JsonRpcProvider } from '../..';

const xdaiRPCUrl = `${process.env.RPC_ORIGIN}/api/xdai`;
const bscRPCUrl = `${process.env.RPC_ORIGIN}/api/bsc`;
// const kovanRPCUrl = `${process.env.RPC_ORIGIN}/api/kovan`;

describe('get-network', () => {
  async function testNetwork(rpcUrl: string) {
    const essentialEth = new JsonRpcProvider(rpcUrl);
    const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
    const [eeNetwork, ethersNetwork] = await Promise.all([
      essentialEth.getNetwork(),
      ethersProvider.getNetwork(),
    ]);

    expect(eeNetwork.chainId).toBe(ethersNetwork.chainId);
    expect(eeNetwork.ensAddress).toBe(ethersNetwork.ensAddress);
    expect(eeNetwork.name).toBe(ethersNetwork.name);
  }
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
