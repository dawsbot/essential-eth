import { ethers } from 'ethers';
import omit from 'just-omit';
import { JsonRpcProvider } from '../../../index';
import { TransactionReceipt } from '../../../types/Transaction.types';
import { rpcUrls } from '../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getTransactionReceipt', () => {
  function testTransactionReceiptEquality(
    transactionReceipt1: ethers.providers.TransactionReceipt,
    transactionReceipt2: TransactionReceipt,
  ) {
    // requires manually comparing values via bigNum conversion
    const bignumCheckKeys = [
      'gasUsed',
      'cumulativeGasUsed',
      'effectiveGasPrice',
    ];
    const omittedTransactionReceipt1 = omit(transactionReceipt1, [
      ...bignumCheckKeys,
    ]);
    const omittedTransactionReceipt2 = omit(transactionReceipt2, [
      ...bignumCheckKeys,
    ]);
    expect(omittedTransactionReceipt1).toStrictEqual(
      omittedTransactionReceipt2,
    );
    expect(
      Math.abs(
        transactionReceipt1.confirmations - transactionReceipt2.confirmations,
      ),
    ).toBeLessThan(3);
    bignumCheckKeys.forEach((key) => {
      const ethersKey = key as keyof ethers.providers.TransactionResponse;
      expect((transactionReceipt1 as any)[ethersKey].toString()).toBe(
        (transactionReceipt2 as any)[key].toString(),
      );
    });
  }
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

    testTransactionReceiptEquality(
      ethersTransactionReceipt,
      essentialEthTransactionReceipt,
    );
  });
});
