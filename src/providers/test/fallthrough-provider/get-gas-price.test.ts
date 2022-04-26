import { FallthroughProvider } from '../../../index';
import { rpcUrls } from '../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getGasPrice', () => {
  it('should match ethers and essential-eth', async () => {
    const essentialEthProvider = new FallthroughProvider([
      'https://bad-123123123123.com',
      // url with request delayed by 20 seconds
      'https://flash-sgkl.onrender.com/delay/20000',
      'https://bad-523123123123.com',
      rpcUrl,
    ]);
    const block = await essentialEthProvider.getBlock(14631185);

    expect(block.gasUsed).toBe(2429588);
  });
});
