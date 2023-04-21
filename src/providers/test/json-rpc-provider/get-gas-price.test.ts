import unfetch from 'isomorphic-unfetch';
import { JsonRpcProvider } from '../../../index';
import { mockOf } from '../mock-of';
import { rpcUrls } from '../rpc-urls';

jest.mock('isomorphic-unfetch');
const stringResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: '0xa',
});

const rpcUrl = rpcUrls.mainnet;

describe('provider.getGasPrice', () => {
  it('should get integer of gas price', async () => {
    const essentialEthProvider = new JsonRpcProvider(rpcUrl);
    mockOf(unfetch).mockReturnValueOnce(
      Promise.resolve({
        text: () => stringResponse,
      } as unknown as Response),
    );

    const essentialEthGasPrice = await essentialEthProvider.getGasPrice();
    expect(essentialEthGasPrice.toString()).toBe('10');
  });
});
