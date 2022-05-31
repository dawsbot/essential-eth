import { ethers } from 'ethers';
import Web3 from 'web3';
import { JsonRpcProvider } from '../../..';
import { rpcUrls } from './../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

// Based on https://etherscan.io/tx/0x277c40de5bf1d4fa06e37dce8e1370dac7273a4b2a883515176f51abaa50d512
const dataFromTo = {
  data: '0x',
  from: '0xcbd6832ebc203e49e2b771897067fce3c58575ac',
  to: '0x7515439f67b7cb656803eb8f9066adac02631d97',
};

// Based on https://etherscan.io/tx/0xfc4a0544289c9eae2f94a9091208e3793ef8e9e93ea4dbaa80f70115be5e9813
const dataFromGasTo = {
  from: '0x3d13c2224a1cdd661e4cc91091f83047750270c5',
  data: '0x',
  gas: 102850283925,
  to: '0x08daeb76f90d9192ba03154b7046f2865736a2b5',
};

describe('provider.call', () => {
  const essentialEthProvider = new JsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);
  const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);

  it('should match ethers.js -- data, from, to', async () => {
    const [eeCall, ethersCall] = await Promise.all([
      essentialEthProvider.call(dataFromTo),
      ethersProvider.call(dataFromTo),
    ]);
    expect(eeCall).toBe(ethersCall);
  });
  it('should match web3.js -- data, from, to', async () => {
    const [eeCall, web3Call] = await Promise.all([
      essentialEthProvider.call(dataFromTo),
      web3Provider.eth.call(dataFromTo),
    ]);
    expect(eeCall).toBe(web3Call);
  });
  it('should match ethers.js -- data, from, gas, to', async () => {
    const [eeCall, ethersCall] = await Promise.all([
      essentialEthProvider.call(dataFromGasTo),
      ethersProvider.call(dataFromGasTo),
    ]);
    expect(eeCall).toBe(ethersCall);
  });
  it('should match web3.js -- data, from, gas, to', async () => {
    const [eeCall, web3Call] = await Promise.all([
      essentialEthProvider.call(dataFromGasTo),
      web3Provider.eth.call(dataFromGasTo),
    ]);
    expect(eeCall).toBe(web3Call);
  });
});
