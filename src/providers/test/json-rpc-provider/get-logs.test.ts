import { StaticJsonRpcProvider } from '@ethersproject/providers';
import Web3 from 'web3';
import { JsonRpcProvider } from '../../../index';
import { rpcUrls } from './../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getLogs', () => {
  const essentialEthProvider = new JsonRpcProvider(rpcUrl);
  const ethersProvider = new StaticJsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);

  it('should match ethers.js', async () => {
    const filter = {
      fromBlock: '0xE1F8F1',
      toBlock: '0xE1F8F1',
      address: '0xfbddadd80fe7bda00b901fbaf73803f2238ae655',
    };
    const [eeLogs, ethersLogs] = await Promise.all([
      essentialEthProvider.getLogs(filter),
      ethersProvider.getLogs(filter),
    ]);
    expect(eeLogs).toStrictEqual(ethersLogs);
  });
  it('should match web3.js', async () => {
    const filter = {
      fromBlock: '0xE1F8F1',
      toBlock: '0xE1F8F1',
      address: '0xfbddadd80fe7bda00b901fbaf73803f2238ae655',
    };
    const [eeLogs, web3Logs] = await Promise.all([
      essentialEthProvider.getLogs(filter),
      web3Provider.eth.getPastLogs(filter),
    ]);
    web3Logs.forEach((log: any) => {
      delete log.id;
    });
    expect(eeLogs).toStrictEqual(web3Logs);
  });
});
