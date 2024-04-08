import * as unfetch from 'isomorphic-unfetch';
import {
  buildFetchInit,
  buildRPCPostBody,
} from '../../../classes/utils/fetchers';
import { JsonRpcProvider } from '../../../index';
import { mockOf } from '../mock-of';

vi.mock('isomorphic-unfetch');
const mockPostResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: '0xa',
});
const TEST_URL = 'https://test.com';
describe('provider.getBlockNumber', () => {
  it('should get number integer', async () => {
    const essentialEthProvider = new JsonRpcProvider(TEST_URL);
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockPostResponse),
    } as Response);
    const spy = vi.spyOn(unfetch, 'default');
    const essentialEthBlockNumber = await essentialEthProvider.getBlockNumber();
    expect(essentialEthBlockNumber).toBe(10);
    expect(spy).toHaveBeenCalledWith(
      TEST_URL,
      buildFetchInit(buildRPCPostBody('eth_blockNumber', [])),
    );
  });
});
