import omit from 'just-omit';
import { hexToDecimal } from '../../../classes/utils/hex-to-decimal';
import { JsonRpcProvider, tinyBig } from '../../../index';
import type { TransactionResponse } from '../../../types/Transaction.types';
import { rpcUrls } from '../rpc-urls';
import * as unfetch from 'isomorphic-unfetch';
import { mockOf } from '../mock-of';

const rpcUrl = rpcUrls.mainnet;

jest.mock('isomorphic-unfetch');

const transactionHash =
      '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';

const mockTransactionResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: {
    blockHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    blockNumber: '0x1',
    from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    gas: '0x5208',
    gasPrice: '0x2540be400',
    hash: transactionHash,
    input: '0x',
    nonce: '0x1',
    to: '0x3535353535353535353535353535353535353535',
    transactionIndex: '0x0',
    value: '0x1',
    v: '0x25',
    r: '0x3d71c9ac9e9382a652a96217c3ee7a4b4f75ec86d4c6a4ad5754a13c1eb14d19',
    s: '0x7e0f08a62d7c1150238e2bc1b9d6d49fa6c1758c0f60e0d6646d30e7b6598a2e',
  }
});

const mockBlockResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: {
    number: '0x3',
    hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    parentHash: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    mixHash: '0xcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    nonce: '0x0102030405060708',
    sha3Uncles: '0xdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    logsBloom: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    transactionsRoot: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    stateRoot: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    receiptsRoot: '0x1111111111111111111111111111111111111111111111111111111111111111',
    miner: '0x8888888888888888888888888888888888888888',
    difficulty: '0x20000',
    totalDifficulty: '0x30000',
    extraData: '0x74657374',
    size: '0x100',
    gasLimit: '0x2fefd8',
    gasUsed: '0x5208',
    timestamp: '0x5f2e4f20',
    transactions: [],
    uncles: [],
  }
});

// Web3 transaction response for the same hash
const expectedTransactionResponse = {
  blockHash: '0x876810a013dbcd140f6fd6048c1dc33abbb901f1f96b394c2fa63aef3cb40b5d',
  blockNumber: 14578286,
  from: '0xdfD9dE5f6FA60BD70636c0900752E93a6144AEd4',
  gas: 112163,
  gasPrice: '48592426858',
  maxPriorityFeePerGas: '1500000000',
  maxFeePerGas: '67681261618',
  hash: '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789',
  input: '0x83259f170000000000000000000000000000000000000000000000000000000000000080000000000000000000000000dfd9de5f6fa60bd70636c0900752e93a6144aed400000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000009e99ad11a214fd016b19dc3648678c5944859ae292b21c24ca94f857836c4596f1950c82dd0c23dd621af4763edc2f66466e63c5df9de0c1107b1cd16bf460fe93e43fd308e3444bc79c3d88a4cb961dc8367ab6ad048867afc76d193bca99cf3a068864ed4a7df1dbf1d4c52238eced3e5e05644b4040fc2b3ccb8557b0e99fff6131305a0ea2b8061b90bd418db5bbdd2e92129f52d93f90531465e309c4caec5b85285822b6196398d36f16f511811b61bbda6461e80e29210cd303118bdcee8df6fa0505ffbe8642094fd2ba4dd458496fe3b459ac880bbf71877c713e969ccf5ed7efab8a84ebc07e3939901371ca427e1192e455a8f35a6a1d7ad09e1475dd1758b36fa631dab5d70e99316b23c4c43094188d360cd9c3457355904e07c00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000162074a7047f',
  nonce: 129,
  to: '0x39B72d136ba3e4ceF35F48CD09587ffaB754DD8B',
  transactionIndex: 29,
  value: '0',
  type: 2,
  accessList: [],
  chainId: '1',
  v: '0x0',
  r: '0x59a7c15b12c18cd68d6c440963d959bff3e73831ffc938e75ecad07f7ee43fbc',
  s: '0x1ebaf05f0d9273b16c2a7748b150a79d22533a8cd74552611cbe620fee3dcf1c'
}

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
      ];
      const omittable1 = [...numCheckKeys];
      const omittable2 = ['confirmations', ...numCheckKeys];

      numCheckKeys.forEach((key) => {
        console.log(key);
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

  it('should match web3.js', async () => {
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockTransactionResponse),
    } as Response);
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockBlockResponse),
    } as Response);
    const spy = jest.spyOn(unfetch, 'default');

    const essentialEthTransaction = await essentialEthProvider.getTransaction( transactionHash );
    console.log(essentialEthTransaction);
    testTransactionEquality(essentialEthTransaction)
  });
  // it('should match ethers.js', async () => {
  //   const transactionHash =
  //     '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
  //   const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
  //   const essentialEthProvider = new JsonRpcProvider(rpcUrl);
  //   const [ethersTransaction, essentialEthTransaction] = await Promise.all([
  //     ethersProvider.getTransaction(transactionHash),
  //     essentialEthProvider.getTransaction(transactionHash),
  //   ]);

  //   testTransactionEquality(ethersTransaction, essentialEthTransaction);
  // });
});
