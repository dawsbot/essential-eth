import { ethers } from 'ethers';
import omit from 'just-omit';
import Web3 from 'web3';
import { JsonRpcProvider } from '../..';
import { rpcUrls } from './rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getTransaction', () => {
  function testTransactionEquality(transaction1: any, transaction2: any) {
    transaction1 = omit(transaction1, 'wait');
    transaction2 = omit(transaction2, 'wait');
    console.log({
      ethers: JSON.stringify(transaction1),
      ee: JSON.stringify(transaction2),
    });
    expect(transaction1).toStrictEqual(transaction2);
    // transaction1 = omit(transaction1, ''
    // // slight mis-timing in eth node responses
    // expect(omit())
    // expect(omit(block1, ['totalDifficulty', 'difficulty'])).toStrictEqual(
    //   omit(block2, ['totalDifficulty', 'difficulty']),
    // );

    // // validate that difficulty and totalDifficulty are still very close
    // expect(
    //   Big(block1.difficulty).minus(block2.difficulty).abs().toNumber(),
    // ).toBeLessThan(3);

    // expect(
    //   Big(block1.totalDifficulty)
    //     .minus(block2.totalDifficulty)
    //     .abs()
    //     .toNumber(),
    // ).toBeLessThan(5000000 /* 2616793 and 1187442 on recent tests */);
  }
  it('should match web3 and essential-eth', async () => {
    const transactionHash =
      '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
    const web3Provider = new Web3(rpcUrl);
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    const [web3Transaction, essentialEthTransaction] = await Promise.all([
      web3Provider.eth.getTransaction(transactionHash),
      essentialEthProvider.getTransaction(transactionHash),
    ]);

    testTransactionEquality(web3Transaction, essentialEthTransaction);
  });
  it.only('should match ethers and essential-eth', async () => {
    const transactionHash =
      '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
    const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    const [ethersTransaction, essentialEthTransaction] = await Promise.all([
      ethersProvider.getTransaction(transactionHash),
      essentialEthProvider.getTransaction(transactionHash),
    ]);

    testTransactionEquality(ethersTransaction, essentialEthTransaction);
  });
});
