import { isAddress, JsonRpcProvider } from '../../../index';
import { fakeUrls, rpcUrls } from '../rpc-urls';

const testConfig = {
  mainnet: {
    rpcUrl: rpcUrls.mainnet,
    chainId: 1,
    name: 'eth',
    ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  },
  oeth: {
    rpcUrl: rpcUrls.oeth,
    chainId: 10,
    name: 'oeth',
    ensAddress: undefined,
  },
};
describe('provider.getNetwork happy path', () => {
  async function testNetwork(networkName: keyof typeof testConfig) {
    const config = testConfig[networkName];
    const essentialEth = new JsonRpcProvider(config.rpcUrl);
    const network = await essentialEth.getNetwork();

    expect(network.chainId).toBe(config.chainId);
    expect(network.name).toBe(config.name);

    expect(network.ensAddress ? isAddress(network.ensAddress) : true).toBe(
      true,
    );
  }

  it('should return proper mainnet info', async () => {
    await testNetwork('mainnet');
  });
  it('should return optimism info', async () => {
    await testNetwork('oeth');
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
