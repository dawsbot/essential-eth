import { ethers } from 'ethers';
import Web3 from 'web3';
import { JsonRpcProvider } from '../../..';
import { etherToWei } from '../../../utils/ether-to-wei';
import { rpcUrls } from '../rpc-urls';

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
  value: etherToWei(0.001).toNumber(),
};

describe('provider.estimateGas', () => {
  const essentialEthProvider = new JsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);
  const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);

  it('should match ethers.js -- data, to', async () => {
    const [eeEstimateGas, ethersEstimateGas] = await Promise.all([
      essentialEthProvider.estimateGas(dataTo),
      ethersProvider.estimateGas(dataTo),
    ]);
    expect(eeEstimateGas.toString()).toBe(ethersEstimateGas.toString());
  });
  it('should match web3.js -- data, to', async () => {
    const [eeEstimateGas, web3EstimateGas] = await Promise.all([
      essentialEthProvider.estimateGas(dataTo),
      web3Provider.eth.estimateGas(dataTo),
    ]);
    expect(eeEstimateGas.toString()).toBe(web3EstimateGas.toString());
  });
  it('should match ethers.js -- data, to, value', async () => {
    const [eeEstimateGas, ethersEstimateGas] = await Promise.all([
      essentialEthProvider.estimateGas(dataToValue),
      ethersProvider.estimateGas(dataToValue),
    ]);
    expect(eeEstimateGas.toString()).toBe(ethersEstimateGas.toString());
  });
  it('should match web3.js -- data, to, value', async () => {
    const [eeEstimateGas, web3EstimateGas] = await Promise.all([
      essentialEthProvider.estimateGas(dataToValue),
      web3Provider.eth.estimateGas(dataToValue),
    ]);
    expect(eeEstimateGas.toString()).toBe(web3EstimateGas.toString());
  });
});
