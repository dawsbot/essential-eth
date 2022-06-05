import Big from 'big.js';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { JsonRpcProvider, tinyBig } from '../../..';
import { hexToDecimal } from '../../../classes/utils/hex-to-decimal';
import { rpcUrls } from './../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

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
  const essentialEthProvider = new JsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);
  const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);

  it('throws', async () => {
    await expect(
      essentialEthProvider.call({
        ...dataTo,
        maxFeePerGas: '0x12',
        maxPriorityFeePerGas: '0x123',
      }),
    ).rejects.toThrow();
  });

  it('should match ethers.js -- data, to', async () => {
    const [eeCall, ethersCall, web3Call] = await Promise.all([
      essentialEthProvider.call(dataTo),
      ethersProvider.call(dataTo),
      web3Provider.eth.call(dataTo),
    ]);
    expect(eeCall).not.toBe('0x');
    expect(eeCall).toBe(ethersCall);
    expect(eeCall).toBe(web3Call);
  });

  it('should match ethers.js -- all mixed data as strings', async () => {
    const [eeCall, ethersCall, web3Call] = await Promise.all([
      essentialEthProvider.call(dataFromGasTo),
      ethersProvider.call(dataFromGasTo),
      web3Provider.eth.call({
        ...dataFromGasTo,
        nonce: Number(hexToDecimal(dataFromGasTo.nonce)),
      }),
    ]);
    expect(eeCall).toBe(ethersCall);
    expect(eeCall).toBe(web3Call);
  });

  it('should match ethers.js -- all mixed data as TinyBig', async () => {
    const [eeCall, ethersCall, web3Call] = await Promise.all([
      essentialEthProvider.call({
        ...dataFromGasTo,
        nonce: tinyBig(dataFromGasTo.nonce),
        gas: tinyBig(dataFromGasTo.gas),
        value: tinyBig(dataFromGasTo.value),
      }),
      ethersProvider.call(dataFromGasTo),
      web3Provider.eth.call({
        ...dataFromGasTo,
        nonce: Number(hexToDecimal(dataFromGasTo.nonce)),
      }),
    ]);
    expect(eeCall).toBe(ethersCall);
    expect(eeCall).toBe(web3Call);
  });

  it('should match ethers.js -- all mixeddata as Big', async () => {
    const [eeCall, ethersCall, web3Call] = await Promise.all([
      essentialEthProvider.call({
        ...dataFromGasTo,
        nonce: new Big(hexToDecimal(dataFromGasTo.nonce)),
        gas: new Big(dataFromGasTo.gas),
        value: new Big(hexToDecimal(dataFromGasTo.value)),
      }),
      ethersProvider.call(dataFromGasTo),
      web3Provider.eth.call({
        ...dataFromGasTo,
        nonce: Number(hexToDecimal(dataFromGasTo.nonce)),
      }),
    ]);
    expect(eeCall).toBe(ethersCall);
    expect(eeCall).toBe(web3Call);
  });
});
