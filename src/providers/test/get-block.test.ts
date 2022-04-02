import Big from 'big.js';
import omit from 'just-omit';
import Web3 from 'web3';
import { Block, JsonRpcProvider } from '../..';

// RSK has 30 second block times so tests pass more often
const rpcUrl = `https://public-node.rsk.co`;

describe('matches web3', () => {
  function testBlockEquality(block1: Block, block2: Block) {
    // slight mis-timing in eth node responses
    expect(omit(block1, ['totalDifficulty', 'difficulty'])).toStrictEqual(
      omit(block2, ['totalDifficulty', 'difficulty']),
    );

    // validate that difficulty and totalDifficulty are still very close
    expect(
      Big(block1.difficulty).minus(block2.difficulty).abs().toNumber(),
    ).toBeLessThan(3);

    expect(
      Big(block1.totalDifficulty)
        .minus(block2.totalDifficulty)
        .abs()
        .toNumber(),
    ).toBeLessThan(5000000 /* 2616793 and 1187442 on recent tests */);
  }

  const essentialEthProvider = new JsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);
  it('should get latest block', async () => {
    const [eeLatestBlock, web3LatestBlock] = await Promise.all([
      essentialEthProvider.getBlock('latest'),
      web3Provider.eth.getBlock('latest'),
    ]);
    testBlockEquality(eeLatestBlock, web3LatestBlock as unknown as Block);
  });
  it('should get latest block, uses fallback when first URL fails', async () => {
    const essentialEthFallbackProvider = new JsonRpcProvider([
      'https://invalid-url.test',
      rpcUrl,
    ]);
    const [eeEarliestBlock, web3EarliestBlock] = await Promise.all([
      essentialEthFallbackProvider.getBlock('earliest'),
      web3Provider.eth.getBlock('earliest'),
    ]);
    testBlockEquality(eeEarliestBlock, web3EarliestBlock as unknown as Block);
  });
  it('should get earliest block', async () => {
    const [eeEarliestBlock, web3EarliestBlock] = await Promise.all([
      essentialEthProvider.getBlock('earliest'),
      web3Provider.eth.getBlock('earliest'),
    ]);
    testBlockEquality(eeEarliestBlock, web3EarliestBlock as unknown as Block);
  });
  const blockNumber = Math.floor(Math.random() * 13250630);
  it(`should get random block as decimal integer. (block #${blockNumber})`, async () => {
    const [eeRandomBlock, web3RandomBlock] = await Promise.all([
      essentialEthProvider.getBlock(blockNumber, true),
      web3Provider.eth.getBlock(blockNumber, true),
    ]);
    testBlockEquality(eeRandomBlock, web3RandomBlock as unknown as Block);
  });
});
