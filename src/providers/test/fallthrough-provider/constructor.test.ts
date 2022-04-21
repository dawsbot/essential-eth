import { FallthroughProvider } from './../../FallthroughProvider';

describe('constructor', () => {
  it('should throw on invalid constructor params', async () => {
    const provider = new FallthroughProvider();
    const block = await provider.getBlock();

    expect(block).toBeGreaterThan(100);
  });
  //   it('should allow valid params', async () => {
  //     await testGetBalance(rpcUrl, 'earliest');
  //   });
});
