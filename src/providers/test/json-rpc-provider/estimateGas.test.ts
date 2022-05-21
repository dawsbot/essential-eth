import { JsonRpcProvider } from '../../..';
import { rpcUrls } from '../rpc-urls';

async function testEstimateGas(rpcUrl: string) {
  const transaction = {
    to: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
    data: '0x3b3b57debf074faa138b72c65adbdcfb329847e4f2c04bde7f7dd7fcad5a52d2f395a558',
  };
  const eeProvider = new JsonRpcProvider(rpcUrl);
  const gasUsed = await eeProvider.estimateGas(transaction);

  // TODO how use gasUsed to expect ???

  // eslint-disable-next-line no-console
  console.log('gasUsed', gasUsed);
}

describe('provider.estimateGas matic', () => {
  const rpcUrl = rpcUrls.matic;
  it('the gas price after being given additional information', async () => {
    await testEstimateGas(rpcUrl);
  });
});
