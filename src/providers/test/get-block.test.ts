import omit from 'just-omit';
import Web3 from 'web3';
import { BlockTransactionObject } from 'web3-eth/types';
import { BlockResponse, JsonRpcProvider } from '../..';
import { BlockTransactionResponse } from '../../types/Transaction.types';
import { fakeUrls } from './rpc-urls';

// RSK has 30 second block times so tests pass more often
const rpcUrl = `https://public-node.rsk.co`;

describe('provider.getBlock happy path', () => {
  function testBlockEquality(
    block1: BlockResponse,
    block2: BlockTransactionObject,
  ) {
    // only full transaction objects have ignorable fields
    if (
      block1.transactions.some((transaction) => typeof transaction === 'string')
    ) {
      throw new Error('transaction is string');
    }
    const omittedKeys = ['gas', 'gasPrice', 'value', 'v'];
    const filteredBlock1 = {
      ...block1,
      transactions: block1.transactions.map((transaction) =>
        omit(transaction as unknown as BlockTransactionResponse, omittedKeys),
      ),
    };
    const filteredBlock2 = {
      ...block2,
      transactions: block2.transactions.map((transaction) =>
        omit(transaction, omittedKeys),
      ),
    };
    expect(filteredBlock1).toStrictEqual(filteredBlock2);
  }

  const essentialEthProvider = new JsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);
  it('should get default latest block', async () => {
    const [eeDefaultLatestBlock, eeLatestBlock] = await Promise.all([
      essentialEthProvider.getBlock(),
      essentialEthProvider.getBlock('latest'),
    ]);
    expect(eeDefaultLatestBlock).toStrictEqual(eeLatestBlock);
  });
  it('should get latest block', async () => {
    const [eeLatestBlock, web3LatestBlock] = await Promise.all([
      essentialEthProvider.getBlock('latest'),
      web3Provider.eth.getBlock('latest'),
    ]);
    expect(eeLatestBlock).toStrictEqual(web3LatestBlock);
  });
  it('should get earliest block', async () => {
    const [eeEarliestBlock, web3EarliestBlock] = await Promise.all([
      essentialEthProvider.getBlock('earliest'),
      web3Provider.eth.getBlock('earliest'),
    ]);
    expect(eeEarliestBlock).toStrictEqual(web3EarliestBlock);
  });
  const blockNumber = Math.floor(Math.random() * 4202460 /* latest block */);
  it(`should get random block as decimal integer. (block #${blockNumber})`, async () => {
    const [eeRandomBlock, web3RandomBlock] = await Promise.all([
      essentialEthProvider.getBlock(blockNumber, true),
      web3Provider.eth.getBlock(blockNumber, true),
    ]);
    testBlockEquality(eeRandomBlock, web3RandomBlock);
    // expect(eeRandomBlock).toStrictEqual(web3RandomBlock);
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
