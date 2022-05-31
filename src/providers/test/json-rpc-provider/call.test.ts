import { ethers } from 'ethers';
import Web3 from 'web3';
import { JsonRpcProvider } from '../../..';
import { rpcUrls } from './../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

// Based on https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1
const dataFromTo = {
  data: '0xa9059cbb0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279000000000000000000000000000000000000000000000000000000003b0559f4',
  from: '0xbae7ebe87fc708426a193f49c4829cdc6221ac84',
  value: 0,
  to: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
};

const fromGasPriceTo = {
  from: '0x7352bc108af10481333cb00bffe960f9f743b6dd',
  data: '0xf6c023a5000000000000000000000000000000000000000000000000000000000000001ce91dc04e90a07c27a4e417fb6fa564a97c63d57ae4b945d9fd112328790fe5810b04a7a5764d99d51d4bbd4fab4f40d4268b4031d0866e759dfbd4ddc61b5d69',
  gasPrice: 69850283925,
  value: 0,
  to: '0x4aa0247996529009a1d805accc84432cc1b5da5d',
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
  it.todo('should match web3.js -- to, from');
  it.todo('should match ethers.js -- to, data');
  it.todo('should match web3.js -- to, data');
  it.todo('should match ethers.js -- from, value, gasPrice');
  it.todo('should match web3.js -- from, value, gasPrice');
});
