import * as unfetch from 'isomorphic-unfetch';
import type { TransactionRequest } from '../../..';
import { JsonRpcProvider } from '../../..';
import {
  buildFetchInit,
  buildRPCPostBody,
} from '../../../classes/utils/fetchers';
import { prepareTransaction } from '../../../classes/utils/prepare-transaction';
import { etherToWei } from '../../../utils/ether-to-wei';
import { mockOf } from '../mock-of';
import { rpcUrls } from '../rpc-urls';

vi.mock('isomorphic-unfetch');

const rpcUrl = rpcUrls.mainnet;

const dataTo = {
  to: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
  data: '0x3b3b57debf074faa138b72c65adbdcfb329847e4f2c04bde7f7dd7fcad5a52d2f395a558',
};

const dataToValue = {
  // Wrapped ETH address
  to: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  // `function deposit() payable`
  data: '0xd0e30db0',
  value: etherToWei("0.001"),
};

async function testEstimateGas(transaction: TransactionRequest) {
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

  const estimatedGas = await provider.estimateGas(transaction);

  expect(estimatedGas.toString()).toBe('10');
  expect(spy).toHaveBeenCalledWith(
    rpcUrl,
    buildFetchInit(
      buildRPCPostBody('eth_estimateGas', [prepareTransaction(transaction)]),
    ),
  );
}

describe('provider.estimateGas', () => {
  it('should estimate gas with data and to', async () => {
    await testEstimateGas(dataTo);
  });

  it('should estimate gas with data, to, and value', async () => {
    await testEstimateGas(dataToValue);
  });
});
