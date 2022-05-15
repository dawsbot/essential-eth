// performance polyfill required to support node <= 14
import { performance } from 'perf_hooks';
import { FallthroughProvider } from '../../../index';
import { rpcUrls } from '../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

function timePromise(fn: () => Promise<any>): Promise<number> {
  const onPromiseDone = () => performance.now() - start;

  const start = performance.now();
  return fn().then(onPromiseDone, onPromiseDone);
}

describe('provider.getGasPrice', () => {
  it('should fallthrough on several types of invalid urls', async () => {
    const essentialEthProvider = new FallthroughProvider([
      'https://bad-123123123123.com',
      'https://bad-523123123123.com',
      rpcUrl,
    ]);
    const block = await essentialEthProvider.getBlock(14631185);
    expect(block.gasUsed).toBe(2429588);
  });
  it('should fallthrough after timeout linearly', async () => {
    const essentialEthProvider = new FallthroughProvider(
      [
        'https://flash-sgkl.onrender.com/delay/10000',
        // url with request delayed by 20 seconds
        'https://flash-sgkl.onrender.com/delay/10000',
        'https://bad-523123123123.com',
        rpcUrl,
      ],
      { timeoutDuration: 1000 },
    );
    await timePromise(() => essentialEthProvider.getBlock(14631000)).then(
      (duration) => {
        // times out the first two requests in 2000 ms each
        expect(duration).toBeGreaterThan(2000);
        // finished the last valid request within two seconds
        expect(duration).toBeLessThan(4000);
      },
    );
  });

  it('should mutex the current rpc selection properly', async () => {
    const providers = [1, 2, 3].map(
      () =>
        new FallthroughProvider(
          ['https://flash-sgkl.onrender.com/delay/10000', rpcUrl],
          { timeoutDuration: 2500 },
        ),
    );

    const allBlocks = await Promise.all(
      providers.map((provider) => provider.getBlock(123456)),
    );
    allBlocks.forEach((blockNumber) => {
      expect(blockNumber.difficulty).toBe('4505282870523');
    });
  });
});
