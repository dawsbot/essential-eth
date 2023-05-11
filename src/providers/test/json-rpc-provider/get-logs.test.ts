import * as unfetch from 'isomorphic-unfetch';
import { JsonRpcProvider } from '../../../index';
import type { RPCLog } from '../../../types/Transaction.types';
import type { Filter } from './../../../types/Filter.types';
import { rpcUrls } from './../rpc-urls';
import { mockOf } from '../mock-of';
import { buildFetchInit, buildRPCPostBody } from '../../../classes/utils/fetchers';
import { cleanLog } from '../../../classes/utils/clean-log';

const rpcUrl = rpcUrls.mainnet;
jest.mock('isomorphic-unfetch');

// Example logs that should be returned
// https://etherscan.io/address/0xfbddadd80fe7bda00b901fbaf73803f2238ae655#events
// Block(s) are 14809329
const STRONGBLOCK_ADDRESS = '0xfbddadd80fe7bda00b901fbaf73803f2238ae655';
const filterAddressFromTo: Filter = {
  address: STRONGBLOCK_ADDRESS,
  fromBlock: '0xE1F8F1',
  toBlock: '0xE1F8F1',
};
// Example logs that should be returned
// https://etherscan.io/address/0x596a0f276ee432d8a28441e55737ff55cf30d0f7#events
const RARELAND_ADDRESS = '0x596a0f276ee432d8a28441e55737ff55cf30d0f7';
const filterAddressTopics: Filter = {
  address: RARELAND_ADDRESS,
  topics: [
    '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
  ],
};
// https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#events
// Address is for Wrapped Ether Contract
const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
const filterAll: Filter = {
  address: WETH_ADDRESS,
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x00000000000000000000000021b8065d10f73ee2e260e5b47d3344d3ced7596e',
  ],
  fromBlock: 14825027,
  toBlock: 14825039,
};

const mockfilterAddressFromToLogs = [
  {
    address: '0xfbddadd80fe7bda00b901fbaf73803f2238ae655',
    topics: [
      '0xd8138f8a3f377c5259ca548e70e4c2de94f129f5a11036a15b69513cba2b426a',
      '0x00000000000000000000000028c2e3e17f8c61a9b7515f7bb1e1347846588b82'
    ],
    data: '0x0000000000000000000000000000000000000000000000001dbaed81bf64db6d',
    blockNumber: '0xe1f8f1',
    transactionHash: '0x5dec3a55b87edac0af5c4a9afdd015bb04303fdf86525dd1cc4e7aa7653b6301',
    transactionIndex: '0x29',
    blockHash: '0x343ead2d84a53b054bc191fe00807d59b40094bb0cbc49b3ba550169b046d4b8',
    logIndex: '0x88',
    removed: false
  },
  {
    address: '0xfbddadd80fe7bda00b901fbaf73803f2238ae655',
    topics: [
      '0xd8138f8a3f377c5259ca548e70e4c2de94f129f5a11036a15b69513cba2b426a',
      '0x000000000000000000000000c3b80d78bb52fd734c4f730dad5e190ba4ecb830'
    ],
    data: '0x0000000000000000000000000000000000000000000000001c277de315af8924',
    blockNumber: '0xe1f8f1',
    transactionHash: '0xae04b63efd57852e34bdc84e257bb413f9f942288f63a131d4b7071c8ee0b896',
    transactionIndex: '0x2f',
    blockHash: '0x343ead2d84a53b054bc191fe00807d59b40094bb0cbc49b3ba550169b046d4b8',
    logIndex: '0x95',
    removed: false
  },
  {
    address: '0xfbddadd80fe7bda00b901fbaf73803f2238ae655',
    topics: [
      '0xd8138f8a3f377c5259ca548e70e4c2de94f129f5a11036a15b69513cba2b426a',
      '0x000000000000000000000000f1a192063f0a2b2be0cbcb2978b13e95e7f35f6b'
    ],
    data: '0x00000000000000000000000000000000000000000000000018ecfa70ea275b6d',
    blockNumber: '0xe1f8f1',
    transactionHash: '0xbdba7260507b4ca24757809ac9a23e5225e80a491475ccf89a04c1894a693c77',
    transactionIndex: '0x30',
    blockHash: '0x343ead2d84a53b054bc191fe00807d59b40094bb0cbc49b3ba550169b046d4b8',
    logIndex: '0x97',
    removed: false
  },
  {
    address: '0xfbddadd80fe7bda00b901fbaf73803f2238ae655',
    topics: [
      '0xd8138f8a3f377c5259ca548e70e4c2de94f129f5a11036a15b69513cba2b426a',
      '0x000000000000000000000000c78dc12c9b04858d57a108ae948020344895e910'
    ],
    data: '0x0000000000000000000000000000000000000000000000000da5142efe16e492',
    blockNumber: '0xe1f8f1',
    transactionHash: '0xdcf29bd8a44ec89a3b53488dd60b76bd7f1c532db76f88e166f3de1ab216537e',
    transactionIndex: '0x31',
    blockHash: '0x343ead2d84a53b054bc191fe00807d59b40094bb0cbc49b3ba550169b046d4b8',
    logIndex: '0x99',
    removed: false
  },
  {
    address: '0xfbddadd80fe7bda00b901fbaf73803f2238ae655',
    topics: [
      '0xd8138f8a3f377c5259ca548e70e4c2de94f129f5a11036a15b69513cba2b426a',
      '0x000000000000000000000000aaf5c3760f4a77bdf23974f98d69f9ccfd778aea'
    ],
    data: '0x0000000000000000000000000000000000000000000000001086ed3d87034000',
    blockNumber: '0xe1f8f1',
    transactionHash: '0x56130c6e8fdafd0e08411b21ce984eeb56dc61d99a91f03efc7edde748d7ad81',
    transactionIndex: '0x35',
    blockHash: '0x343ead2d84a53b054bc191fe00807d59b40094bb0cbc49b3ba550169b046d4b8',
    logIndex: '0xac',
    removed: false
  },
  {
    address: '0xfbddadd80fe7bda00b901fbaf73803f2238ae655',
    topics: [
      '0x39b0a0620bb668047ab7248973ddfd93d53dff1d4952bd2d56bbf5934edc1fd0',
      '0x0000000000000000000000001753de22132990dd5ab35f13a5951431c8ba08ea'
    ],
    data: '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000e3203b',
    blockNumber: '0xe1f8f1',
    transactionHash: '0xf5a77d85296cc670d577d3c9a76b1fa18be77239a4cb4c05493530866d60c36f',
    transactionIndex: '0x3a',
    blockHash: '0x343ead2d84a53b054bc191fe00807d59b40094bb0cbc49b3ba550169b046d4b8',
    logIndex: '0xb5',
    removed: false
  }
] as Array<RPCLog>;
const mockfilterAddressTopicsLogs = [] as Array<RPCLog>;
const mockfilterAllLogs = [
  {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    topics: [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      '0x00000000000000000000000021b8065d10f73ee2e260e5b47d3344d3ced7596e',
      '0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45'
    ],
    data: '0x000000000000000000000000000000000000000000000000005f862ee352a38a',
    blockNumber: '0xe23645',
    transactionHash: '0xbd49031be16f8fd1775f4e0fe79b408ffd8ae9c65b2827ee47e3238e3f51f4c0',
    transactionIndex: '0xe2',
    blockHash: '0x8e0dfac2f704851960f866c8708b3bef2f66c0fee0329cf25ff0261b264ca6bc',
    logIndex: '0x180',
    removed: false
  }
] as Array<RPCLog>;
const mockRpcAddressFromToResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: mockfilterAddressFromToLogs,
});
const mockRpcAddressTopicsResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: mockfilterAddressTopicsLogs,
});
const mockRpcAllResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: mockfilterAllLogs,
});

describe('provider.getLogs', () => {
  const provider = new JsonRpcProvider(rpcUrl);
  
  async function testGetLogs(mockResponse: string, filter: Filter, expectedLogs: RPCLog[]) {
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockResponse),
    } as Response);

    const spy = jest.spyOn(unfetch, 'default');
    const logs = await provider.getLogs(filter);
    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(
        buildRPCPostBody('eth_getLogs', [filter]),
      ),
    );

    expect(JSON.stringify(logs))
    .toBe(JSON.stringify(expectedLogs.map((log) => cleanLog(log, false))));
  }

  it('should match mock -- address, from, to', async () => {
    await testGetLogs(mockRpcAddressFromToResponse, filterAddressFromTo, mockfilterAddressFromToLogs);
  });

  it('should match mock -- address, topics', async () => {
    await testGetLogs(mockRpcAddressTopicsResponse, filterAddressTopics, mockfilterAddressTopicsLogs);
  });

  it('should match mock -- address, topics, from, to', async () => {
    await testGetLogs(mockRpcAllResponse, filterAll, mockfilterAllLogs);
  });  
});
