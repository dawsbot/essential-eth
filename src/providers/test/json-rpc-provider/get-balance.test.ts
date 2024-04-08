import * as unfetch from 'isomorphic-unfetch';
import { JsonRpcProvider } from '../../..';
import {
  buildFetchInit,
  buildRPCPostBody,
} from '../../../classes/utils/fetchers';
import type { BlockTag } from '../../../types/Block.types';
import { mockOf } from '../mock-of';
import { rpcUrls } from '../rpc-urls';

vi.mock('isomorphic-unfetch');

const address = '0x0000000000000000000000000000000000000001';

async function testGetBalance(rpcUrl: string, blockTag?: BlockTag) {
  const provider = new JsonRpcProvider(rpcUrl);
  const mockPostResponse = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    result: '0xa',
  });

  mockOf(unfetch.default).mockResolvedValueOnce({
    text: () => Promise.resolve(mockPostResponse),
  } as Response);

  const spy = vi.spyOn(unfetch, 'default');

  const balance = await provider.getBalance(address, blockTag);

  expect(balance.toString()).toBe('10');

  const expectedBlockTag = blockTag ?? 'latest';
  expect(spy).toHaveBeenCalledWith(
    rpcUrl,
    buildFetchInit(
      buildRPCPostBody('eth_getBalance', [address, expectedBlockTag]),
    ),
  );
}

describe('provider.getBalance matic', () => {
  const rpcUrl = rpcUrls.matic;
  it('should get the latest balance', async () => {
    await testGetBalance(rpcUrl, 'latest');
  });
  it('should get the earliest balance', async () => {
    await testGetBalance(rpcUrl, 'earliest');
  });
  it('should get the default latest balance', async () => {
    await testGetBalance(rpcUrl);
  });
});
