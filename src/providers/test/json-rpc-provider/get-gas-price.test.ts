import unfetch from 'isomorphic-unfetch';
import z from 'zod';
import { JsonRpcProvider } from '../../../index';
import { mockOf } from '../mock-of';
import { rpcUrls } from '../rpc-urls';
import { TinyBig } from './../../../shared/tiny-big/tiny-big';

jest.mock('isomorphic-unfetch');
const postResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: '0xa',
});

const rpcUrl = rpcUrls.mainnet;

describe('provider.getGasPrice', () => {
  it('should get integer of gas price', async () => {
    const provider = new JsonRpcProvider(rpcUrl);
    mockOf(unfetch).mockReturnValueOnce(
      Promise.resolve({
        text: () => postResponse,
      } as unknown as Response),
    );

    const gasPrice = await provider.getGasPrice();
    expect(z.instanceof(TinyBig).safeParse(gasPrice).success).toBe(true);
    expect(
      z.number().int().positive().safeParse(gasPrice.toNumber()).success,
    ).toBe(true);
    expect(gasPrice.toString()).toBe('10');
  });
});
