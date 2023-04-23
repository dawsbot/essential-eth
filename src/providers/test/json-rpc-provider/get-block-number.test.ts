import * as unfetch from 'isomorphic-unfetch';
import { JsonRpcProvider } from '../../../index';
import { mockOf } from '../mock-of';

jest.mock('isomorphic-unfetch');
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
    const spy = jest.spyOn(unfetch, 'default');
    const essentialEthBlockNumber = await essentialEthProvider.getBlockNumber();
    expect(essentialEthBlockNumber).toBe(10);
    expect(spy).toHaveBeenCalledWith(TEST_URL, {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_blockNumber',
        params: [],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
