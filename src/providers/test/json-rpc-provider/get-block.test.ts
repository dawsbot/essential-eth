import * as unfetch from 'isomorphic-unfetch';
import { JsonRpcProvider, tinyBig, toChecksumAddress } from '../../..';
import type {
  RPCMethodName} from '../../../classes/utils/fetchers';
import {
  buildFetchInit,
  buildRPCPostBody
} from '../../../classes/utils/fetchers';
import { hexToDecimal } from '../../../classes/utils/hex-to-decimal';
import { mockOf } from '../mock-of';
import { rpcUrls } from '../rpc-urls';

jest.mock('isomorphic-unfetch');

const rpcUrl = rpcUrls.mainnet;

const provider = new JsonRpcProvider(rpcUrl);

const mockBlockResponse = {
  number: '0x1b4',
  hash: '0x5f6fb043528e9892679bce31e9e4a9c5773b3b1ebad1dc4c533ed6fe75ebe13d',
  parentHash:
    '0x4e61f7d8fc6253a08d0762dbb2d3d5f4a7e0a2394a2d29c4bbe7056aa13d48e8',
  nonce: '0xe04d296d2460cfb8472af2c5fd05b5a214109c25688d3704aed5484f9a7792f2',
  sha3Uncles:
    '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
  logsBloom: '0x056e68544253...',
  transactionsRoot: '0x9156485c5d...',
  stateRoot: '0x2f8bde4d1b...',
  miner: '0x4e65fda2159562a496f9f3522f89122a3088497a',
  difficulty: '0x027f07',
  totalDifficulty: '0x027f07',
  extraData: '0x000000000000...',
  size: '0x027f07',
  gasLimit: '0x9f759',
  gasUsed: '0x9f759',
  timestamp: '0x54e34e8e',
  transactions: [],
  uncles: [],
};
const mockRpcBlockResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: mockBlockResponse,
});
const mockBlock = {
  ...mockBlockResponse,
  number: Number(hexToDecimal(mockBlockResponse.number)),
  miner: toChecksumAddress(mockBlockResponse.miner),
  totalDifficulty: tinyBig(mockBlockResponse.totalDifficulty),
  difficulty: tinyBig(mockBlockResponse.difficulty),
  gasLimit: tinyBig(mockBlockResponse.gasLimit),
  gasUsed: tinyBig(mockBlockResponse.gasUsed),
  size: tinyBig(mockBlockResponse.size),
  timestamp: tinyBig(mockBlockResponse.timestamp),
};

async function runTest(
  method: RPCMethodName,
  params: (string | number | boolean)[],
  responseIdentifier: string | number,
): Promise<void> {
  jest.clearAllMocks();
  mockOf(unfetch.default).mockResolvedValueOnce({
    text: () => Promise.resolve(mockRpcBlockResponse),
  } as Response);
  const spy = jest.spyOn(unfetch, 'default');

  const result = await provider.getBlock(responseIdentifier);
  expect(spy).toHaveBeenCalledWith(
    rpcUrl,
    buildFetchInit(buildRPCPostBody(method, params)),
  );

  expect(JSON.stringify(result)).toBe(JSON.stringify(mockBlock));
}

describe('provider.getBlock', () => {
  it('should match mocked -- latest', async () => {
    await runTest('eth_getBlockByNumber', ['latest', false], 'latest');
  });

  it('should match mocked block -- earliest', async () => {
    await runTest('eth_getBlockByNumber', ['earliest', false], 'earliest');
  });

  const blockNumber = 1000000; // a certain block number for testing
  it(`should match mocked block -- specific block number as decimal integer. (block #${blockNumber})`, async () => {
    await runTest(
      'eth_getBlockByNumber',
      [tinyBig(blockNumber).toHexString(), false],
      blockNumber,
    );
  });

  const blockHash =
    '0x4cbaa942e48a91108f38e2a250f6dbaff7fffe3027f5ebf76701929eed2b2970'; // Hash corresponds to block on RSK Mainnet
  it(`should match mocked block -- block by hash. (hash = ${blockHash})`, async () => {
    await runTest('eth_getBlockByHash', [blockHash, false], blockHash);
  });
});

describe('provider.getBlock error handling', () => {
  it('should handle empty 200 http response', async () => {
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve('200 OK'),
    } as Response);

    const spy = jest.spyOn(unfetch, 'default');
    await provider.getBlock('earliest').catch(async (error) => {
      // error message is Invalid JSON RPC response: "200 OK"
      expect('Invalid JSON RPC response: "200 OK"').toBe(error.message);
    });

    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(
        buildRPCPostBody('eth_getBlockByNumber', ['earliest', false]),
      ),
    );
  });

  it('should handle empty JSON object', async () => {
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve('{}'),
    } as Response);

    const spy = jest.spyOn(unfetch, 'default');
    await provider.getBlock('earliest').catch(async (error) => {
      // error message is Invalid JSON RPC response: {}
      expect(error.message).toBe('Invalid JSON RPC response: {}');
    });

    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(
        buildRPCPostBody('eth_getBlockByNumber', ['earliest', false]),
      ),
    );
  });
});
