import * as unfetch from 'isomorphic-unfetch';
import { cleanLog } from '../../../../classes/utils/clean-log';
import {
  buildFetchInit,
  buildRPCPostBody,
} from '../../../../classes/utils/fetchers';
import { JsonRpcProvider } from '../../../../index';
import type { Filter } from '../../../../types/Filter.types';
import type { RPCLog } from '../../../../types/Transaction.types';
import { mockOf } from '../../mock-of';
import { rpcUrls } from '../../rpc-urls';
import {
  filterAddressFromTo,
  filterAddressTopics,
  filterAll,
  mockRpcAddressFromToResponse,
  mockRpcAddressTopicsResponse,
  mockRpcAllResponse,
  mockfilterAddressFromToLogs,
  mockfilterAddressTopicsLogs,
  mockfilterAllLogs,
} from './mocks';

const rpcUrl = rpcUrls.mainnet;
vi.mock('isomorphic-unfetch');

describe('provider.getLogs', () => {
  const provider = new JsonRpcProvider(rpcUrl);

  async function testGetLogs(
    mockResponse: string,
    filter: Filter,
    expectedLogs: RPCLog[],
  ) {
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockResponse),
    } as Response);

    const spy = vi.spyOn(unfetch, 'default');
    const logs = await provider.getLogs(filter);
    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(buildRPCPostBody('eth_getLogs', [filter])),
    );

    expect(JSON.stringify(logs)).toBe(
      JSON.stringify(expectedLogs.map((log) => cleanLog(log, false))),
    );
  }

  it('should match mock -- address, from, to', async () => {
    await testGetLogs(
      mockRpcAddressFromToResponse,
      filterAddressFromTo,
      mockfilterAddressFromToLogs,
    );
  });

  it('should match mock -- address, topics', async () => {
    await testGetLogs(
      mockRpcAddressTopicsResponse,
      filterAddressTopics,
      mockfilterAddressTopicsLogs,
    );
  });

  it('should match mock -- address, topics, from, to', async () => {
    await testGetLogs(mockRpcAllResponse, filterAll, mockfilterAllLogs);
  });
});
