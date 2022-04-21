import { FallthroughProvider } from '../../../index';
import { rpcUrls } from '../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getGasPrice', () => {
  it('should match ethers and essential-eth', async () => {
    const essentialEthProvider = new FallthroughProvider([
      'https://bad.com',
      rpcUrl,
    ]);
    const block = await essentialEthProvider.getBlock(14631185);

    expect(block.gasUsed).toBe(100);
  });
});
