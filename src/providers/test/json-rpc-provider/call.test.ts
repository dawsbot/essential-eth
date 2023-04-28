import Big from 'big.js';
import * as unfetch from 'isomorphic-unfetch';
import type { TransactionRequest } from '../../..';
import { JsonRpcProvider, tinyBig } from '../../..';
import {
  buildFetchInit,
  buildRPCPostBody,
} from '../../../classes/utils/fetchers';
import { hexToDecimal } from '../../../classes/utils/hex-to-decimal';
import { prepareTransaction } from '../../../classes/utils/prepare-transaction';
import { mockOf } from '../mock-of';
import { rpcUrls } from './../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

jest.mock('isomorphic-unfetch');

// Based on https://etherscan.io/tx/0x277c40de5bf1d4fa06e37dce8e1370dac7273a4b2a883515176f51abaa50d512
const dataTo = {
  data: '0x70a082310000000000000000000000006E0d01A76C3Cf4288372a29124A26D4353EE51BE',
  to: '0x6b175474e89094c44da98b954eedeac495271d0f',
};

// Based on https://etherscan.io/tx/0xfc4a0544289c9eae2f94a9091208e3793ef8e9e93ea4dbaa80f70115be5e9813
const dataFromGasTo = {
  to: '0x3d13c2224a1cdd661e4cc91091f83047750270c5',
  from: '0x0000000000000000000000000000000000000000',
  nonce: '0x1',
  gas: 999999,
  data: '0x1234',
  value: '0x123',
  // not sure how to get "chainId" into proper format
  // chainId: 1,
  type: 1,
  maxFeePerGas: '0xffffffffff',
};

describe('provider.call', () => {
  const provider = new JsonRpcProvider(rpcUrl);

  it('throws', async () => {
    await expect(
      provider.call({
        ...dataTo,
        maxFeePerGas: '0x12',
        maxPriorityFeePerGas: '0x123',
      }),
    ).rejects.toThrow();
    await expect(
      provider.call({
        ...dataTo,
        gasPrice: '0xfffffff',
        maxFeePerGas: '0x12',
      }),
    ).rejects.toThrow();
    await expect(
      provider.call({
        ...dataTo,
        gasPrice: '0xfffffff',
        maxPriorityFeePerGas: '0x123',
      }),
    ).rejects.toThrow();
  });

  async function testWithMockedResponse(data: TransactionRequest) {
    // a sample Ethereum node response (hex string) expected from call() as a result of "executing" a transaction
    const expectedResult =
      '0x0000000000000000000000000000000000000000000000000858898f93629000';
    mockOf(unfetch.default).mockResolvedValueOnce({
      text: () =>
        Promise.resolve(
          JSON.stringify({ jsonrpc: '2.0', id: 1, result: expectedResult }),
        ),
    } as Response);

    const spy = jest.spyOn(unfetch, 'default');

    const callProvider = await provider.call(data);
    expect(callProvider).toBe(expectedResult);

    expect(spy).toHaveBeenCalledWith(
      rpcUrl,
      buildFetchInit(
        buildRPCPostBody('eth_call', [prepareTransaction(data), 'latest']),
      ),
    );
  }

  it('should return a valid response for given input -- data, to', async () => {
    await testWithMockedResponse(dataTo);
  });

  it('should return a valid response for given input -- data, to, gasPrice', async () => {
    const data = { ...dataTo, gasPrice: 99999999999 };
    await testWithMockedResponse(data);
  });

  it('should return a valid response for given input -- all mixed data as strings', async () => {
    await testWithMockedResponse(dataFromGasTo);
  });

  it('should return a valid response for given input -- all mixed data as TinyBig', async () => {
    await testWithMockedResponse({
      ...dataFromGasTo,
      nonce: tinyBig(dataFromGasTo.nonce),
      gas: tinyBig(dataFromGasTo.gas),
      value: tinyBig(dataFromGasTo.value),
    });
  });

  it('should return a valid response for given input -- all mixeddata as Big', async () => {
    await testWithMockedResponse({
      ...dataFromGasTo,
      nonce: new Big(hexToDecimal(dataFromGasTo.nonce)),
      gas: new Big(dataFromGasTo.gas),
      value: new Big(hexToDecimal(dataFromGasTo.value)),
    });
  });
});
