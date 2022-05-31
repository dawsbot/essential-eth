import { ethers } from 'ethers';
import omit from 'just-omit';
import Web3 from 'web3';
import web3 from 'web3-eth';
import { JsonRpcProvider } from '../../..';
import { tinyBig } from '../../../shared/tiny-big/tiny-big';
import { BlockResponse } from '../../../types/Block.types';
import { fakeUrls } from './../rpc-urls';

// RSK has 30 second block times so tests pass more often
const rpcUrl = `https://public-node.rsk.co`;

function testBlockEquality(
  eeBlock: BlockResponse,
  otherBlock:
    | ethers.providers.Block
    | web3.BlockTransactionString
    | web3.BlockTransactionObject,
) {
  let typeCheckKeys: Array<string> = [
    'difficulty',
    'gasLimit',
    'gasUsed',
    'number',
    'timestamp',
  ];
  let omittableEE: Array<string> = [];
  let omittableOther: Array<string> = [];
  if (typeof otherBlock.gasLimit === 'number') {
    // web3.js returns gasLimit as number, ethers returns as BigNum
    if (eeBlock.transactions && typeof eeBlock.transactions[0] !== 'string') {
      eeBlock.transactions.forEach((transaction: any) => {
        if (transaction.gas) transaction.gas = transaction.gas.toString();
        if (transaction.value) transaction.value = transaction.value.toString();
        if (transaction.gasPrice)
          transaction.gasPrice = transaction.gasPrice.toString();
        if (transaction.nonce) transaction.nonce = transaction.nonce.toString();
        if (transaction.v) transaction.v = `0x${transaction.v.toString(16)}`;
      });
      otherBlock.transactions.forEach((transaction: any) => {
        if (transaction.gas) transaction.gas = transaction.gas.toString();
        else if (transaction.gas == 0) transaction.gas = '0'; // won't go to string when zero??
        if (transaction.nonce) transaction.nonce = transaction.nonce.toString();
      });
    }
    typeCheckKeys.push('totalDifficulty', 'size');
    omittableEE = typeCheckKeys;
    omittableOther = typeCheckKeys;

    typeCheckKeys.forEach((key) => {
      expect((eeBlock as any)[key].toString()).toBe(
        (otherBlock as any)[key].toString(),
      );
    });
  } else {
    // rename _difficulty to difficulty
    delete (otherBlock as any).difficulty;
    (otherBlock as any).difficulty = (otherBlock as any)._difficulty;
    delete (otherBlock as any)._difficulty;

    omittableEE = [
      // ethers.js doesn't return all these values that essential-eth does, some specific to RSK node
      ...typeCheckKeys,
      'bitcoinMergedMiningCoinbaseTransaction',
      'bitcoinMergedMiningCoinbaseTransaction',
      'bitcoinMergedMiningHeader',
      'bitcoinMergedMiningHeader',
      'bitcoinMergedMiningMerkleProof',
      'cumulativeDifficulty',
      'hashForMergedMining',
      'logsBloom',
      'minimumGasPrice',
      'paidFees',
      'receiptsRoot',
      'sha3Uncles',
      'size',
      'stateRoot',
      'totalDifficulty',
      'transactionsRoot',
      'uncles',
    ];
    omittableOther = [...typeCheckKeys];
  }

  typeCheckKeys.forEach((key) => {
    expect((eeBlock as any)[key].toString()).toBe(
      (otherBlock as any)[key].toString(),
    );
  });

  const omittedEEBlock = omit(eeBlock, omittableEE);
  const omittedOtherBlock = omit(otherBlock, omittableOther);
  expect(omittedEEBlock).toStrictEqual(omittedOtherBlock);
}

describe('provider.getBlock', () => {
  const essentialEthProvider = new JsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);
  const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);

  it('should match ethers.js -- latest', async () => {
    const [eeLatestBlock, ethersLatestBlock] = await Promise.all([
      essentialEthProvider.getBlock('latest'),
      ethersProvider.getBlock('latest'),
    ]);
    testBlockEquality(eeLatestBlock, ethersLatestBlock);
  });
  it('should match web3.js -- latest', async () => {
    const [eeLatestBlock, web3LatestBlock] = await Promise.all([
      essentialEthProvider.getBlock('latest'),
      web3Provider.eth.getBlock('latest'),
    ]);
    testBlockEquality(eeLatestBlock, web3LatestBlock);
  });
  it('should match ethers.js -- earliest', async () => {
    const [eeEarliestBlock, ethersEarliestBlock] = await Promise.all([
      essentialEthProvider.getBlock('earliest'),
      ethersProvider.getBlock('earliest'),
    ]);
    testBlockEquality(eeEarliestBlock, ethersEarliestBlock);
  });
  it('should match web3.js -- earliest', async () => {
    const [eeEarliestBlock, web3EarliestBlock] = await Promise.all([
      essentialEthProvider.getBlock('earliest'),
      web3Provider.eth.getBlock('earliest'),
    ]);
    testBlockEquality(eeEarliestBlock, web3EarliestBlock);
  });

  const blockNumber = Math.floor(Math.random() * 4202460 /* latest block */);
  it(`should match ethers.js -- random block as decimal integer. (block #${blockNumber})`, async () => {
    const [eeRandomBlock, ethersRandomBlock] = await Promise.all([
      essentialEthProvider.getBlock(blockNumber),
      ethersProvider.getBlock(blockNumber),
    ]);
    testBlockEquality(eeRandomBlock, ethersRandomBlock);
  });
  it(`should match web3.js -- random block as decimal integer & transactions. (block #${blockNumber})`, async () => {
    const [eeRandomBlock, web3RandomBlock] = await Promise.all([
      essentialEthProvider.getBlock(blockNumber, true),
      web3Provider.eth.getBlock(blockNumber, true),
    ]);
    testBlockEquality(eeRandomBlock, web3RandomBlock);
  });

  const blockHash =
    '0x4cbaa942e48a91108f38e2a250f6dbaff7fffe3027f5ebf76701929eed2b2970'; // Hash corresponds to block on RSK Mainnet
  it(`should match ethers.js -- block by hash. (hash = ${blockHash})`, async () => {
    const [eeBlockByHash, ethersBlockByHash] = await Promise.all([
      essentialEthProvider.getBlock(blockHash),
      ethersProvider.getBlock(blockHash),
    ]);
    testBlockEquality(eeBlockByHash, ethersBlockByHash);
  });
  it(`should match web3.js -- block by hash. (hash = ${blockHash})`, async () => {
    const [eeBlockByHash, web3BlockByHash] = await Promise.all([
      essentialEthProvider.getBlock(blockHash),
      web3Provider.eth.getBlock(blockHash),
    ]);
    testBlockEquality(eeBlockByHash, web3BlockByHash);
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
