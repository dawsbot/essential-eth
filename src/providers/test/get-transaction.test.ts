import { ethers } from 'ethers';
import omit from 'just-omit';
import { JsonRpcProvider, TransactionResponse } from '../..';
import { rpcUrls } from './rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getTransaction', () => {
  function testTransactionEquality(
    transaction1: ethers.providers.TransactionResponse,
    transaction2: TransactionResponse,
  ) {
    const bignumCheckKeys = [
      'value',
      'gas',
      'gasPrice',
      'maxFeePerGas',
      'maxPriorityFeePerGas',
    ];
    const omittedTransaction1 = omit(transaction1, [
      'wait',
      ...bignumCheckKeys,
    ]);
    const omittedTransaction2 = omit(transaction2, bignumCheckKeys);

    // console.log({
    //   maxFeePerGasNum: transaction2.maxFeePerGas.toNumber(),
    //   maxFeePerGasStr: transaction2.maxFeePerGas.toString(),
    //   maxFeePerGasPlus3: transaction2.maxFeePerGas.plus(3),
    // });
    console.log({
      ethers: JSON.stringify(transaction1, null, 2),
      eestringified: JSON.stringify(transaction2, null, 2),
      ee: transaction2,
    });
    expect(omittedTransaction1).toStrictEqual(omittedTransaction2);
    bignumCheckKeys.forEach((key) => {
      let ethersKey = key as keyof ethers.providers.TransactionResponse;
      if (key === 'gas') {
        ethersKey = 'gasLimit';
      }
      expect(
        ((transaction1 as any)[ethersKey] as any).toString(),
      ).toStrictEqual(((transaction2 as any)[key] as any).toString());
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

  //   testTransactionEquality(web3Transaction, essentialEthTransaction);
  // });
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
