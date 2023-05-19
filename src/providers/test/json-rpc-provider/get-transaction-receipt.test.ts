import * as unfetch from 'isomorphic-unfetch';
import { cleanLog } from '../../../classes/utils/clean-log';
import {
  buildFetchInit,
  buildRPCPostBody,
} from '../../../classes/utils/fetchers';
import { hexToDecimal } from '../../../classes/utils/hex-to-decimal';
import { JsonRpcProvider, tinyBig } from '../../../index';
import { mockOf } from '../mock-of';
import { rpcUrls } from '../rpc-urls';

jest.mock('isomorphic-unfetch');
const rpcUrl = rpcUrls.mainnet;

const mockBlocksBetween = 10;
const mockReceiptResponse = {
  blockHash:
    '0x876810a013dbcd140f6fd6048c1dc33abbb901f1f96b394c2fa63aef3cb40b5d',
  blockNumber: 14578286,
  contractAddress: '0xdfD9dE5f6FA60BD70636c0900752E93a6144AEd4',
  cumulativeGasUsed: '0x7f110',
  effectiveGasPrice: '0x7f110',
  from: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
  gasUsed: '0x7f110',
  logs: [
    {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      blockHash:
        '0x876810a013dbcd140f6fd6048c1dc33abbb901f1f96b394c2fa63aef3cb40b5d',
      blockNumber: '0xdeadc2',
      data: '0x0000000000000000000000000000000000000000000000000000000000000000',
      logIndex: '0x1d',
      removed: false,
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
      transactionHash:
        '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789',
      transactionIndex: '0x1d',
    },
  ],
  logsBloom: '0x0000000000000',
  status: '0x1',
  to: '0xdfD9dE5f6FA60BD70636c0900752E93a6144AEd4',
  transactionHash:
    '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789',
  transactionIndex: 29,
  type: 2,
  confirmations: mockBlocksBetween,
};
const mockRpcReceiptResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: mockReceiptResponse,
});
const mockRpcBlockResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: {
    number: mockReceiptResponse.blockNumber + mockBlocksBetween - 1,
  },
});
const mockReceipt = {
  ...mockReceiptResponse,
  cumulativeGasUsed: tinyBig(mockReceiptResponse.cumulativeGasUsed),
  effectiveGasPrice: tinyBig(mockReceiptResponse.effectiveGasPrice),
  gasUsed: tinyBig(mockReceiptResponse.gasUsed),
  status: Number(hexToDecimal(mockReceiptResponse.status)),
  logs: mockReceiptResponse.logs.map((log) => cleanLog(log, true)),
  byzantium: true,
};

describe('provider.getTransactionReceipt', () => {
  it('should match mocked transaction receipt', async () => {
    const transactionHash =
      '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
    const provider = new JsonRpcProvider(rpcUrl);

    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockRpcReceiptResponse),
    } as Response);
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockRpcBlockResponse),
    } as Response);

    const spy = jest.spyOn(unfetch, 'default');
    const transactionReceipt = await provider.getTransactionReceipt(
      transactionHash,
    );
    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(
        buildRPCPostBody('eth_getTransactionReceipt', [transactionHash]),
      ),
    );
    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(
        buildRPCPostBody('eth_getBlockByNumber', ['latest', false]),
      ),
    );

    expect(JSON.stringify(transactionReceipt)).toBe(
      JSON.stringify(mockReceipt),
    );
  });
});
