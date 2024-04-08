import * as unfetch from 'isomorphic-unfetch';
import z from 'zod';
import {
  buildFetchInit,
  buildRPCPostBody,
} from '../../../classes/utils/fetchers';
import { JsonRpcProvider } from '../../../index';
import { mockOf } from '../mock-of';
import { rpcUrls } from '../rpc-urls';
import { TinyBig } from './../../../shared/tiny-big/tiny-big';

vi.mock('isomorphic-unfetch');
const mockPostResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: '0xa',
});

const rpcUrl = rpcUrls.mainnet;

describe('provider.getGasPrice', () => {
  it('should get TinyBig integer', async () => {
    const provider = new JsonRpcProvider(rpcUrl);
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockPostResponse),
    } as Response);
    const spy = vi.spyOn(unfetch, 'default');

    const gasPrice = await provider.getGasPrice();
    expect(z.instanceof(TinyBig).safeParse(gasPrice).success).toBeTruthy();
    expect(gasPrice.toString()).toBe('10');
    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(buildRPCPostBody('eth_gasPrice', [])),
    );
  });
});
