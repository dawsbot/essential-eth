import { ethers } from 'ethers';
import omit from 'just-omit';
import { JsonRpcProvider } from '../../../index';
import { TransactionResponse } from '../../../types/Transaction.types';
import { rpcUrls } from '../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getTransaction', () => {
  function testTransactionEquality(
    transaction1: ethers.providers.TransactionResponse,
    transaction2: TransactionResponse,
  ) {
    // requires manually comparing values via bigNum conversion
    const bignumCheckKeys = [
      'value',
      'gas',
      'gasPrice',
      'maxFeePerGas',
      'maxPriorityFeePerGas',
      'confirmations',
    ];
    const omittedTransaction1 = omit(transaction1, [
      'wait', // ethers injects this to allow you to wait on a certain confirmation count
      'creates', // ethers injects this custom https://github.com/ethers-io/ethers.js/blob/948f77050dae884fe88932fd88af75560aac9d78/packages/providers/src.ts/formatter.ts#L336
      'data', // ethers renames input to data https://github.com/ethers-io/ethers.js/blob/948f77050dae884fe88932fd88af75560aac9d78/packages/providers/src.ts/formatter.ts#L331
      'gasLimit', // ethers renames gas to gasLimit https://github.com/ethers-io/ethers.js/blob/948f77050dae884fe88932fd88af75560aac9d78/packages/providers/src.ts/formatter.ts#L320
      'input',
      ...bignumCheckKeys,
    ]);
    const omittedTransaction2 = omit(transaction2, [
      'input', // ee proxies exactly this from the eth node
      ...bignumCheckKeys,
    ]);
    expect(omittedTransaction1).toStrictEqual(omittedTransaction2);
    expect(
      Math.abs(transaction1.confirmations - transaction2.confirmations),
    ).toBeLessThan(3);
    bignumCheckKeys.forEach((key) => {
      let ethersKey = key as keyof ethers.providers.TransactionResponse;
      if (key === 'gas') {
        ethersKey = 'gasLimit';
      }
      expect((transaction1 as any)[ethersKey].toString()).toBe(
        (transaction2 as any)[key].toString(),
      );
    });
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
    const [ethersTransaction, essentialEthTransaction] = await Promise.all([
      ethersProvider.getTransaction(transactionHash),
      essentialEthProvider.getTransaction(transactionHash),
    ]);

    testTransactionEquality(ethersTransaction, essentialEthTransaction);
  });
});
