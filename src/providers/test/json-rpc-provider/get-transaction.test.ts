import omit from 'just-omit';
import { hexToDecimal } from '../../../classes/utils/hex-to-decimal';
import { JsonRpcProvider, tinyBig } from '../../../index';
import type { TransactionResponse } from '../../../types/Transaction.types';
import { rpcUrls } from '../rpc-urls';
import * as unfetch from 'isomorphic-unfetch';
import { mockOf } from '../mock-of';
import { cleanTransaction } from '../../../classes/utils/clean-transaction';
import { buildFetchInit, buildRPCPostBody } from '../../../classes/utils/fetchers';

const rpcUrl = rpcUrls.mainnet;

jest.mock('isomorphic-unfetch');

const transactionHash =
  '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';

const mockTransaction = {
  blockHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  blockNumber: '0x1',
  from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  gas: '0x5208',
  gasPrice: '0x2540be400',
  maxFeePerGas: '0x34e15f86', 
  maxPriorityFeePerGas: '0x5d21dba0',
  hash: transactionHash,
  input: '0x',
  nonce: '0x1',
  to: '0x3535353535353535353535353535353535353535',
  transactionIndex: '0x0',
  value: '0x1',
  v: '0x25',
  r: '0x3d71c9ac9e9382a652a96217c3ee7a4b4f75ec86d4c6a4ad5754a13c1eb14d19',
  s: '0x7e0f08a62d7c1150238e2bc1b9d6d49fa6c1758c0f60e0d6646d30e7b6598a2e',
  chainId: '1',  
  type: '0x1'
}

const mockRpcTransactionResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: mockTransaction
});

const mockBlockResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: {
    number: '0x3',
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  }
});

describe('provider.getTransaction', () => {
  function testTransactionEquality(
    testTransaction: TransactionResponse,
  ) {
      const numCheckKeys = [
        'chainId',
        'gas',
        'gasPrice',
        'maxFeePerGas',
        'maxPriorityFeePerGas',
        'nonce',
        'v',
        'value',
        'confirmations',
      ];
      const omittable1 = [...numCheckKeys];
      const omittable2 = ['confirmations', ...numCheckKeys];
      const expectedTransactionResponse = cleanTransaction(mockTransaction);
      // confirmations = (currentBlock - transactionBlockNumber) + 1
      // confirmations = (3 - 1) + 1 = 3
      expectedTransactionResponse.confirmations = 3;

      numCheckKeys.forEach((key) => {
        if (
          typeof (expectedTransactionResponse as any)[key] === 'string' &&
          (expectedTransactionResponse as any)[key].startsWith('0x')
        ) {
          (expectedTransactionResponse as any)[key] = Number(
            hexToDecimal((expectedTransactionResponse as any)[key]),
          );
        }
        // give room for error in tests
        expect(
          tinyBig((expectedTransactionResponse as any)[key])
            .minus(tinyBig((testTransaction as any)[key]))
            .abs()
            .lt(2),
        ).toBe(true);
      });

    const omittedexpectedTransactionResponse = omit(expectedTransactionResponse, omittable1 as any);
    const omittedTransaction2 = omit(testTransaction, omittable2 as any);
    expect(omittedexpectedTransactionResponse).toMatchObject(omittedTransaction2);
  }

  it('should match our expected transaction', async () => {
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockRpcTransactionResponse),
    } as Response);
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockBlockResponse),
    } as Response);
    const spy = jest.spyOn(unfetch, 'default');
    
    const essentialEthTransaction = await essentialEthProvider.getTransaction( transactionHash );
  
    testTransactionEquality(essentialEthTransaction);
    
    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(buildRPCPostBody('eth_getTransactionByHash', [transactionHash])),
    );
    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(buildRPCPostBody('eth_getBlockByNumber', ['latest', false])),
    );
  });
});
