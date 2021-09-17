import Big from 'big.js';
import omit from 'just-omit';
import Web3 from 'web3';
import { Block, EssentialEth } from '.';

// const rpcUrl = 'http://localhost:3001/post';
const rpcUrl = 'https://mainnet.infura.io/v3/b092cda5108a4b059115083bb5d1a773';

describe('getBlock', () => {
  it('matches web3', async () => {
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
      ).toBeLessThan(4000000 /* 2616793 and 1187442 on recent tests */);
    }

    const essentialEth = new EssentialEth(rpcUrl);
    const web3 = new Web3(rpcUrl);
    const [
      eeLatestBlock,
      web3LatestBlock,
      eeEarliestBlock,
      web3EarliestBlock,
      eeRandomBlock,
      web3RandomBlock,
    ] = await Promise.all([
      essentialEth.getBlock('latest'),
      web3.eth.getBlock('latest'),
      essentialEth.getBlock('earliest'),
      web3.eth.getBlock('earliest'),
      essentialEth.getBlock(5242880, true),
      web3.eth.getBlock(5242880, true),
    ]);
    testBlockEquality(eeLatestBlock, web3LatestBlock as unknown as Block);

    testBlockEquality(eeEarliestBlock, web3EarliestBlock as unknown as Block);
    testBlockEquality(eeRandomBlock, web3RandomBlock as unknown as Block);
  });
});
