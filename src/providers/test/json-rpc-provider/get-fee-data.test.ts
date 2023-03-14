import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { JsonRpcProvider } from '../../JsonRpcProvider';
import { rpcUrls } from './../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

const essentialEthProvider = new JsonRpcProvider(rpcUrl);
const ethersProvider = new StaticJsonRpcProvider(rpcUrl);
describe('provider.getFeeData', () => {
  it('should match ethers.js', async () => {
    const [ethersFeeData, eeFeeData] = await Promise.all([
      ethersProvider.getFeeData(),
      essentialEthProvider.getFeeData(),
    ]);
    expect(eeFeeData.gasPrice.toString()).toBe(
      // @ts-ignore
      ethersFeeData?.gasPrice.toString(),
    );
    // @ts-ignore
    expect(eeFeeData.lastBaseFeePerGas.toString()).toBe(
      // @ts-ignore
      ethersFeeData?.lastBaseFeePerGas.toString(),
    );
    // @ts-ignore
    expect(eeFeeData.maxFeePerGas.toString()).toBe(
      // @ts-ignore
      ethersFeeData?.maxFeePerGas.toString(),
    );
    // @ts-ignore
    expect(eeFeeData.maxPriorityFeePerGas.toString()).toBe(
      // @ts-ignore
      ethersFeeData?.maxPriorityFeePerGas.toString(),
    );
  });
});
