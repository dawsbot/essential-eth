import { ethers } from 'ethers';
import { JsonRpcProvider } from '../..';
import { fakeUrls, rpcUrls } from './rpc-urls';

const xdaiRPCUrl = rpcUrls.gno;
const bscRPCUrl = rpcUrls.bnb;

describe('provider.getNetwork happy path', () => {
  async function testNetwork(rpcUrl: string) {
    const essentialEth = new JsonRpcProvider(rpcUrl);
    const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
    const [eeNetwork, ethersNetwork] = await Promise.all([
      essentialEth.getNetwork(),
      ethersProvider.getNetwork(),
    ]);

    expect(eeNetwork.chainId).toBe(ethersNetwork.chainId);
    expect(eeNetwork.ensAddress).toBe(ethersNetwork.ensAddress);
    expect(eeNetwork.name).toBe(
      // xdai was renamed to gnosis but ethers is still out-of-date
      ethersNetwork.name === 'xdai' ? 'gno' : ethersNetwork.name,
    );
  }
  it('xdai should match ethers', async () => {
    await testNetwork(xdaiRPCUrl);
  });
  it('bsc should match ethers', async () => {
    await testNetwork(bscRPCUrl);
  });
});

describe('provider.getNetwork error handling', () => {
  it('should throw on empty 200 http response', async () => {
    expect.assertions(1);
    const essentialEth = new JsonRpcProvider(fakeUrls.notRPCButRealHttp);
    await essentialEth.getNetwork().catch((err) => {
      expect(err instanceof Error).toBe(true);
    });
  });
});
