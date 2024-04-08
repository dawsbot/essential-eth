import * as unfetch from 'isomorphic-unfetch';
import { describe, expect, it, vi } from 'vitest';
import { jsonRpcProvider, tinyBig } from '../..';
import { buildFetchInit, buildRPCPostBody } from '../../classes/utils/fetchers';
import type { BlockTag } from '../../types/Block.types';
import { mockOf } from './mock-of';
import { rpcUrls } from './rpc-urls';

vi.mock('isomorphic-unfetch');

const address = '0x71660c4005ba85c37ccec55d0c4493e66fe775d3';

async function testGetTC(rpcUrl: string, blockTag?: BlockTag) {
  const provider = jsonRpcProvider(rpcUrl);
  const mockPostResponse = JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    result: '0xa',
  });

  mockOf(unfetch.default).mockResolvedValueOnce({
    text: () => Promise.resolve(mockPostResponse),
  } as Response);

  const spy = vi.spyOn(unfetch, 'default');

  const transactionCount = await provider.getTransactionCount(
    address,
    blockTag,
  );

  expect(transactionCount.toString()).toBe('10');

  const expectedBlockTag =
    typeof blockTag === 'number'
      ? tinyBig(blockTag).toHexString()
      : blockTag ?? 'latest';
  expect(spy).toHaveBeenCalledWith(
    rpcUrl,
    buildFetchInit(
      buildRPCPostBody('eth_getTransactionCount', [address, expectedBlockTag]),
    ),
  );
}

describe('provider.getTransactionCount matic', () => {
  const rpcUrl = rpcUrls.matic;
  it('should get the latest by the latest block', async () => {
    await testGetTC(rpcUrl, 'latest');
  });
  it('should get transaction count by default latest block', async () => {
    await testGetTC(rpcUrl);
  });
  it('should get transaction count by earliest block', async () => {
    await testGetTC(rpcUrl, 'earliest');
  });
  it('should get TC by block number', async () => {
    await testGetTC(rpcUrl, 14649390);
  });
});
