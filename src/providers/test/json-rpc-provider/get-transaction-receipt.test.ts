import { ethers } from 'ethers';
import omit from 'just-omit';
import { JsonRpcProvider } from '../../../index';
import { TransactionReceipt } from '../../../types/Transaction.types';
import { rpcUrls } from '../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getTransactionReceipt', () => {
  function testTransactionEquality(
    transaction1: ethers.providers.TransactionReceipt,
    transaction2: TransactionReceipt,
  ) {
    // requires manually comparing values via bigNum conversion
    const bignumCheckKeys = [
      'gasUsed',
      'cumulativeGasPrice',
      'effectiveGasPrice',
    ];
    const omittedTransaction1 = omit(transaction1, [
      'logs', // temporary
      ...bignumCheckKeys,
    ]);
    const omittedTransaction2 = omit(transaction2, [
      'logs', // temporary
      ...bignumCheckKeys,
    ]);
    expect(omittedTransaction1).toStrictEqual(omittedTransaction2);
    expect(
      Math.abs(transaction1.confirmations - transaction2.confirmations),
    ).toBeLessThan(3);
  }
  // it('should match web3 and essential-eth', async () => {
  //   const transactionHash =
  //     '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
  //   const web3Provider = new Web3(rpcUrl);
  //   const essentialEthProvider = new JsonRpcProvider(rpcUrl);
  //   const [web3Transaction, essentialEthTransaction] = await Promise.all([
  //     web3Provider.eth.getTransaction(transactionHash),
  //     essentialEthProvider.getTransaction(transactionHash),
  //   ]);

  //   testTransactionEquality(web3Transaction as any, essentialEthTransaction);
  // });
  it('should match ethers and essential-eth', async () => {
    const transactionHash =
      '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
    const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    const [ethersTransactionReceipt, essentialEthTransactionReceipt] =
      await Promise.all([
        ethersProvider.getTransactionReceipt(transactionHash),
        essentialEthProvider.getTransactionReceipt(transactionHash),
      ]);

    testTransactionEquality(
      ethersTransactionReceipt,
      essentialEthTransactionReceipt,
    );
  });
});
