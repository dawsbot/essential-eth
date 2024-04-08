import * as unfetch from 'isomorphic-unfetch';
import {
  buildFetchInit,
  buildRPCPostBody,
} from '../../../classes/utils/fetchers';
import type { TinyBig } from '../../../shared/tiny-big/tiny-big';
import { JsonRpcProvider } from '../../JsonRpcProvider';
import { mockOf } from '../mock-of';
import { rpcUrls } from './../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

const essentialEthProvider = new JsonRpcProvider(rpcUrl);

vi.mock('isomorphic-unfetch');
//  essentialEthProvider.getFeeData() calls these methods internally
const mockGetBlockResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: {
    baseFeePerGas: '0xa',
    // add more block data here if needed
  },
});
const mockGetGasPriceResponse = JSON.stringify({
  jsonrpc: '2.0',
  id: 1,
  result: '0xa',
});

describe('provider.getFeeData', () => {
  it('should match mocked responses', async () => {
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockGetBlockResponse),
    } as Response);
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () => Promise.resolve(mockGetGasPriceResponse),
    } as Response);
    const spy = vi.spyOn(unfetch, 'default');

    const feeData = (await essentialEthProvider.getFeeData()) as {
      gasPrice: TinyBig;
      lastBaseFeePerGas: TinyBig;
      maxFeePerGas: TinyBig;
      maxPriorityFeePerGas: TinyBig;
    };
    expect(feeData.gasPrice.toString()).toBe('10');
    // lastBaseFeePerGas should be equal to the mocked baseFeePerGas value
    expect(feeData.lastBaseFeePerGas.toString()).toBe('10');
    // maxFeePerGas is calculated as (baseFeePerGas * 2) + maxPriorityFeePerGas, (10 * 2) + 1500000000 = 1500000020
    expect(feeData.maxFeePerGas.toString()).toBe('1500000020');
    // maxPriorityFeePerGas is a constant value (1500000000) in the getFeeData function
    expect(feeData.maxPriorityFeePerGas.toString()).toBe('1500000000');
    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(
        buildRPCPostBody('eth_getBlockByNumber', ['latest', false]),
      ),
    );
    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(buildRPCPostBody('eth_gasPrice', [])),
    );
  });
});
