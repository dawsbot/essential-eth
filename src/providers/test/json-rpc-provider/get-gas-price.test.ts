import unfetch from 'isomorphic-unfetch';
import z from 'zod';
import { JsonRpcProvider } from '../../../index';
import { mockOf } from '../mock-of';
import { rpcUrls } from '../rpc-urls';
import { TinyBig } from './../../../shared/tiny-big/tiny-big';

jest.mock('isomorphic-unfetch');
const mockPostResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: '0xa',
});

const rpcUrl = rpcUrls.mainnet;

describe('provider.getGasPrice', () => {
  it('should get TinyBig integer', async () => {
    const provider = new JsonRpcProvider(rpcUrl);
    mockOf(unfetch).mockResolvedValueOnce({
      text: () => mockPostResponse,
    } as unknown as Response);

    const gasPrice = await provider.getGasPrice();
    expect(z.instanceof(TinyBig).safeParse(gasPrice).success).toBe(true);
    expect(gasPrice.toString()).toBe('10');
  });
});
