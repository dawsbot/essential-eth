import * as unfetch from 'isomorphic-unfetch';
import {
  buildFetchInit,
  buildRPCPostBody,
} from '../../../classes/utils/fetchers';
import { JsonRpcProvider, tinyBig } from '../../../index';
import { mockOf } from '../mock-of';
import { rpcUrls } from '../rpc-urls';

const rpcUrl = rpcUrls.mainnet;
jest.mock('isomorphic-unfetch');

const mockBlocksBetween = 10;
const mockTransactionResponse = {
  blockHash:
    '0x876810a013dbcd140f6fd6048c1dc33abbb901f1f96b394c2fa63aef3cb40b5d',
  blockNumber: 14578286,
  from: '0xdfD9dE5f6FA60BD70636c0900752E93a6144AEd4',
  gas: '112163',
  gasPrice: '48592426858',
  maxPriorityFeePerGas: '1500000000',
  maxFeePerGas: '67681261618',
  hash: '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789',
  input:
    '0x83259f170000000000000000000000000000000000000000000000000000000000000080000000000000000000000000dfd9de5f6fa60bd70636c0900752e93a6144aed400000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000009e99ad11a214fd016b19dc3648678c5944859ae292b21c24ca94f857836c4596f1950c82dd0c23dd621af4763edc2f66466e63c5df9de0c1107b1cd16bf460fe93e43fd308e3444bc79c3d88a4cb961dc8367ab6ad048867afc76d193bca99cf3a068864ed4a7df1dbf1d4c52238eced3e5e05644b4040fc2b3ccb8557b0e99fff6131305a0ea2b8061b90bd418db5bbdd2e92129f52d93f90531465e309c4caec5b85285822b6196398d36f16f511811b61bbda6461e80e29210cd303118bdcee8df6fa0505ffbe8642094fd2ba4dd458496fe3b459ac880bbf71877c713e969ccf5ed7efab8a84ebc07e3939901371ca427e1192e455a8f35a6a1d7ad09e1475dd1758b36fa631dab5d70e99316b23c4c43094188d360cd9c3457355904e07c00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000162074a7047f',
  nonce: '129',
  to: '0x39B72d136ba3e4ceF35F48CD09587ffaB754DD8B',
  transactionIndex: 29,
  value: '0',
  type: 2,
  accessList: [],
  chainId: 1,
  v: 0,
  r: '0x59a7c15b12c18cd68d6c440963d959bff3e73831ffc938e75ecad07f7ee43fbc',
  s: '0x1ebaf05f0d9273b16c2a7748b150a79d22533a8cd74552611cbe620fee3dcf1c',
  confirmations: mockBlocksBetween,
};
const mockRpcTransactionResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: mockTransactionResponse,
});
const mockRpcBlockResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: {
    number: mockTransactionResponse.blockNumber + mockBlocksBetween - 1,
  },
});

const mockTransaction = {
  ...mockTransactionResponse,
  value: tinyBig(mockTransactionResponse.value),
  nonce: tinyBig(mockTransactionResponse.nonce),
  maxPriorityFeePerGas: tinyBig(mockTransactionResponse.maxPriorityFeePerGas),
  gasPrice: tinyBig(mockTransactionResponse.gasPrice),
  maxFeePerGas: tinyBig(mockTransactionResponse.maxFeePerGas),
  gas: tinyBig(mockTransactionResponse.gas),
};
describe('provider.getTransaction', () => {
  it('should fetch transaction and add confirmations properly', async () => {
    const transactionHash =
      '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
    const provider = new JsonRpcProvider(rpcUrl);

    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockRpcTransactionResponse),
    } as Response);
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockRpcBlockResponse),
    } as Response);

    const spy = jest.spyOn(unfetch, 'default');
    const transaction = await provider.getTransaction(transactionHash);
    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(
        buildRPCPostBody('eth_getTransactionByHash', [transactionHash]),
      ),
    );
    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(
        buildRPCPostBody('eth_getBlockByNumber', ['latest', false]),
      ),
    );

    expect(JSON.stringify(transaction)).toBe(JSON.stringify(mockTransaction));
  });
});