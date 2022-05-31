import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { etherToWei, JsonRpcProvider } from '../../..';
import { TransactionRequest } from '../../types';
import { rpcUrls } from '../rpc-urls';

async function testEstimateGas(transaction: TransactionRequest) {
  const rpcUrl = rpcUrls.mainnet;
  const eeProvider = new JsonRpcProvider(rpcUrl);
  const ethersProvider = new StaticJsonRpcProvider(rpcUrl);
  const [eeGasUsed, ethersGasUsed] = await Promise.all([
    eeProvider.estimateGas(transaction),
    ethersProvider.estimateGas(transaction),
  ]);

  expect(eeGasUsed.toString()).toBe(ethersGasUsed.toString());
}

describe('provider.estimateGas', () => {
  it('transaction with only "to" and "data"', async () => {
    await testEstimateGas({
      to: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
      data: '0x3b3b57debf074faa138b72c65adbdcfb329847e4f2c04bde7f7dd7fcad5a52d2f395a558',
    });
  });
  it('transaction with only "to", "data", and "value"', async () => {
    await testEstimateGas({
      // Wrapped ETH address
      to: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',

      // `function deposit() payable`
      data: '0xd0e30db0',

      // 1 ether
      value: etherToWei('1.0').toHexString(),
    });
  });
});
