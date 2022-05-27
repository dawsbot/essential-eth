import { ethers } from 'ethers';
import omit from 'just-omit';
import Web3 from 'web3';
import web3core from 'web3-core';
import { JsonRpcProvider } from '../../../index';
import { TransactionReceipt } from '../../../types/Transaction.types';
import { rpcUrls } from '../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getTransactionReceipt', () => {
  /**
   *
   * @param transactionReceipt1
   * @param transactionReceipt2
   */
  function testTransactionReceiptEquality(
    transactionReceipt1:
      | ethers.providers.TransactionReceipt
      | web3core.Transaction,
    transactionReceipt2: TransactionReceipt,
  ) {
    let typeCheckKeys: Array<string> = [];
    let omittable1: Array<string> = [];
    let omittable2: Array<string> = [];
    if (
      (transactionReceipt1 as ethers.providers.TransactionReceipt).confirmations
    ) {
      // only ethers response has confirmations
      // requires manually comparing values via bigNum conversion
      typeCheckKeys = ['gasUsed', 'cumulativeGasUsed', 'effectiveGasPrice'];
      omittable1 = typeCheckKeys;
      omittable2 = typeCheckKeys;

      typeCheckKeys.forEach((key) => {
        expect((transactionReceipt1 as any)[key].toString()).toBe(
          (transactionReceipt2 as any)[key].toString(),
        );
      });

      expect(
        Math.abs(
          (transactionReceipt1 as ethers.providers.TransactionReceipt)
            .confirmations - transactionReceipt2.confirmations,
        ),
      ).toBeLessThan(3);
    } else {
      typeCheckKeys = [
        'cumulativeGasUsed',
        'effectiveGasPrice',
        'from',
        'gasUsed',
        'status',
        'to',
        'type',
      ];
      omittable1 = typeCheckKeys;
      omittable2 = ['byzantium', 'confirmations', ...typeCheckKeys];

      typeCheckKeys.forEach((key) => {
        switch (key) {
          case 'cumulativeGasUsed':
          case 'effectiveGasPrice':
          case 'gasUsed':
            expect((transactionReceipt1 as any)[key].toString()).toBe(
              (transactionReceipt2 as any)[key].toString(),
            );
            break;
          case 'from':
          case 'to':
            expect((transactionReceipt1 as any)[key]).toBe(
              (transactionReceipt2 as any)[key].toLowerCase(),
            );
            break;
        }
      });
    }

    const omittedTransactionReceipt1 = omit(transactionReceipt1, omittable1) as
      | TransactionReceipt
      | web3core.TransactionReceipt;
    const omittedTransactionReceipt2 = omit(transactionReceipt2, omittable2) as
      | TransactionReceipt
      | web3core.TransactionReceipt;

    omittedTransactionReceipt1.logs = omittedTransactionReceipt1.logs.map(
      (log) => omit(log, ['id', 'removed']) as any,
    );

    expect(omittedTransactionReceipt1).toStrictEqual(
      omittedTransactionReceipt2,
    );
  }
  it('should match web3.js', async () => {
    const transactionHash =
      '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
    const web3Provider = new Web3(rpcUrl);
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    const [web3TransactionReceipt, essentialEthTransactionReceipt] =
      await Promise.all([
        web3Provider.eth.getTransactionReceipt(transactionHash),
        essentialEthProvider.getTransactionReceipt(transactionHash),
      ]);

    testTransactionReceiptEquality(
      web3TransactionReceipt as any,
      essentialEthTransactionReceipt,
    );
  });
  it('should match ethers', async () => {
    const transactionHash =
      '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
    const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    const [ethersTransactionReceipt, essentialEthTransactionReceipt] =
      await Promise.all([
        ethersProvider.getTransactionReceipt(transactionHash),
        essentialEthProvider.getTransactionReceipt(transactionHash),
      ]);

    testTransactionReceiptEquality(
      ethersTransactionReceipt,
      essentialEthTransactionReceipt,
    );
  });
});
