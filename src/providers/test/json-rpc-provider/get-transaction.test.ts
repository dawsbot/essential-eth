import { ethers } from 'ethers';
import omit from 'just-omit';
import Web3 from 'web3';
import type web3core from 'web3-core';
import { hexToDecimal } from '../../../classes/utils/hex-to-decimal';
import { JsonRpcProvider, tinyBig } from '../../../index';
import type { TransactionResponse } from '../../../types/Transaction.types';
import { rpcUrls } from '../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getTransaction', () => {
  function testTransactionEquality(
    transaction1: ethers.providers.TransactionResponse | web3core.Transaction,
    transaction2: TransactionResponse,
  ) {
    let numCheckKeys: Array<string> = [];
    let omittable1: Array<string> = [];
    let omittable2: Array<string> = [];
    if ((transaction1 as ethers.providers.TransactionResponse).confirmations) {
      // only the ethers response has confirmations
      // requires manually comparing values via bigNum conversion
      numCheckKeys = [
        'nonce',
        'value',
        'gas',
        'gasPrice',
        'maxFeePerGas',
        'maxPriorityFeePerGas',
        'confirmations',
      ];

      omittable1 = [
        'wait', // ethers injects this to allow you to wait on a certain confirmation count
        'creates', // ethers injects this custom https://github.com/ethers-io/ethers.js/blob/948f77050dae884fe88932fd88af75560aac9d78/packages/providers/src.ts/formatter.ts#L336
        'data', // ethers renames input to data https://github.com/ethers-io/ethers.js/blob/948f77050dae884fe88932fd88af75560aac9d78/packages/providers/src.ts/formatter.ts#L331
        'gasLimit', // ethers renames gas to gasLimit https://github.com/ethers-io/ethers.js/blob/948f77050dae884fe88932fd88af75560aac9d78/packages/providers/src.ts/formatter.ts#L320
        'input',
        ...numCheckKeys,
      ];

      omittable2 = ['input', ...numCheckKeys];

      numCheckKeys.forEach((key) => {
        let ethersKey = key as keyof ethers.providers.TransactionResponse;
        if (key === 'gas') {
          ethersKey = 'gasLimit';
        }
        // give small room for error in tests
        expect(
          tinyBig((transaction1 as any)[ethersKey])
            .minus(tinyBig((transaction2 as any)[key]))
            .abs()
            .lt(2),
        ).toBe(true);
      });

      expect(
        Math.abs(
          (transaction1 as ethers.providers.TransactionResponse).confirmations -
            transaction2.confirmations,
        ),
      ).toBeLessThan(3);
    } else {
      numCheckKeys = [
        'chainId',
        'gas',
        'gasPrice',
        'maxFeePerGas',
        'maxPriorityFeePerGas',
        'nonce',
        'v',
        'value',
      ];
      omittable1 = [...numCheckKeys];
      omittable2 = ['confirmations', ...numCheckKeys];

      numCheckKeys.forEach((key) => {
        if (
          typeof (transaction1 as any)[key] === 'string' &&
          (transaction1 as any)[key].startsWith('0x')
        ) {
          (transaction1 as any)[key] = Number(
            hexToDecimal((transaction1 as any)[key]),
          );
        }
        // give room for error in tests
        expect(
          tinyBig((transaction1 as any)[key])
            .minus(tinyBig((transaction2 as any)[key]))
            .abs()
            .lt(2),
        ).toBe(true);
      });
    }

    const omittedTransaction1 = omit(transaction1, omittable1 as any);
    const omittedTransaction2 = omit(transaction2, omittable2 as any);
    expect(omittedTransaction1).toMatchObject(omittedTransaction2);
  }
  it('should match web3.js', async () => {
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
  it('should match ethers.js', async () => {
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
