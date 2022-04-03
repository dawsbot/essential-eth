import Big from 'big.js';
import omit from 'just-omit';
import Web3 from 'web3';
import { Block, JsonRpcProvider } from '../..';
import { fakeUrls } from './rpc-urls';

const rpcUrl = `${process.env.RPC_ORIGIN}/api/eth`;
describe('provider.getBlock happy path', () => {
  function testBlockEquality(block1: Block, block2: Block) {
    // slight mis-timing in eth node responses
    expect(
      (omit as any)(block1, ['totalDifficulty', 'difficulty']),
    ).toStrictEqual((omit as any)(block2, ['totalDifficulty', 'difficulty']));

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

  it('should get latest block', async () => {
    const essentialEth = new JsonRpcProvider(rpcUrl);
    const web3 = new Web3(rpcUrl);
    const [eeLatestBlock, web3LatestBlock] = await Promise.all([
      essentialEth.getBlock('latest'),
      web3.eth.getBlock('latest'),
    ]);
    testBlockEquality(eeLatestBlock, web3LatestBlock as unknown as Block);
  });
  it('should get latest block, uses fallback when first URL fails', async () => {
    const essentialEth = new JsonRpcProvider([
      'https://invalid-url.test',
      rpcUrl,
    ]);
    await essentialEth.getBlock('latest');
  });
  it('should get earliest block', async () => {
    const essentialEth = new JsonRpcProvider(rpcUrl);
    const web3 = new Web3(rpcUrl);
    const [eeEarliestBlock, web3EarliestBlock] = await Promise.all([
      essentialEth.getBlock('earliest'),
      web3.eth.getBlock('earliest'),
    ]);
    testBlockEquality(eeEarliestBlock, web3EarliestBlock as unknown as Block);
  });
  const blockNumber = Math.floor(Math.random() * 13250630);
  it(`should get random block as decimal integer. (block #${blockNumber})`, async () => {
    const essentialEth = new JsonRpcProvider(rpcUrl);
    const web3 = new Web3(rpcUrl);
    const [eeRandomBlock, web3RandomBlock] = await Promise.all([
      essentialEth.getBlock(blockNumber, true),
      web3.eth.getBlock(blockNumber, true),
    ]);
    testBlockEquality(eeRandomBlock, web3RandomBlock as unknown as Block);
  });
});

describe('provider.getBlock error handling', () => {
  it('should handle empty 200 http response', async () => {
    expect.assertions(1);
    const essentialEth = new JsonRpcProvider(fakeUrls.notRPCButRealHttp);
    const web3 = new Web3(fakeUrls.notRPCButRealHttp);
    await essentialEth.getBlock('earliest').catch(async (essentialEthError) => {
      await web3.eth.getBlock('earliest').catch((web3Error) => {
        // error message is Invalid JSON RPC response: "200 OK"
        expect(web3Error.message).toBe(essentialEthError.message);
      });
    });
  });
  // TODO: Make a mock http endpoint which returns an empty json object
  // it.only('should handle json emptry object 200 http response', async () => {
  //   expect.assertions(1);
  //   const essentialEth = new JsonRpcProvider('http://localhost:51196/b.json');
  //   const web3 = new Web3('http://localhost:51196/b.json');
  //   await essentialEth.getBlock('earliest').catch(async (essentialEthError) => {
  //     await web3.eth.getBlock('earliest').catch((web3Error) => {
  //       console.log({ w3: web3Error.message, ee: essentialEthError.message });
  //       // error message is Invalid JSON RPC response: "200 OK"
  //       expect(web3Error.message).toBe(essentialEthError.message);
  //     });
  //   });
  // });
});
