import { ethers } from 'ethers';
import Web3 from 'web3';
import { JsonRpcProvider } from '../../..';
import { rpcUrls } from './../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

const names = ['daws.eth', 'ricmoo.eth', 'vitalik.eth'];

describe('provider.resolveName', () => {
  const essentialEthProvider = new JsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);
  const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);

  it('should match ethers.js', async () => {
    await names.forEach(async (name) => {
      const [eeName, ethersName] = await Promise.all([
        essentialEthProvider.resolveName(name),
        ethersProvider.resolveName(name),
      ]);
      expect(eeName).toBe(ethersName);
    });
  });
  it('should match web3.js', async () => {
    await names.forEach(async (name) => {
      const [eeName, web3Name] = await Promise.all([
        essentialEthProvider.resolveName(name),
        web3Provider.eth.ens.getAddress(name),
      ]);
      expect(eeName).toBe(web3Name);
    });
  });
});
