import { StaticJsonRpcProvider } from '@ethersproject/providers';
import Web3 from 'web3';
import { JsonRpcProvider } from '../../../index';
import type { Log } from '../../../types/Transaction.types';
import type { Filter } from './../../../types/Filter.types';
import { rpcUrls } from './../rpc-urls';

const rpcUrl = rpcUrls.mainnet;

describe('provider.getLogs', () => {
  const essentialEthProvider = new JsonRpcProvider(rpcUrl);
  const ethersProvider = new StaticJsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);

  // Example logs that should be returned
  // https://etherscan.io/address/0xfbddadd80fe7bda00b901fbaf73803f2238ae655#events
  // Block(s) are 14809329
  const STRONGBLOCK_ADDRESS = '0xfbddadd80fe7bda00b901fbaf73803f2238ae655';
  const filterAddressFromTo: Filter = {
    address: STRONGBLOCK_ADDRESS,
    fromBlock: '0xE1F8F1',
    toBlock: '0xE1F8F1',
  };

  // Example logs that should be returned
  // https://etherscan.io/address/0x596a0f276ee432d8a28441e55737ff55cf30d0f7#events
  const RARELAND_ADDRESS = '0x596a0f276ee432d8a28441e55737ff55cf30d0f7';
  const filterAddressTopics: Filter = {
    address: RARELAND_ADDRESS,
    topics: [
      '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
    ],
  };

  // https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#events
  // Address is for Wrapped Ether Contract
  const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
  const filterAll: Filter = {
    address: WETH_ADDRESS,
    topics: [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      '0x00000000000000000000000021b8065d10f73ee2e260e5b47d3344d3ced7596e',
    ],
    fromBlock: 14825027,
    toBlock: 14825039,
  };

  function testLogEquality(ee: Array<Log>, other: Array<any>) {
    expect(ee).not.toBe([]); // indicates that filter needs to be updated; logs are from blocks too long ago to retrieve without full archive
    other.forEach((log: any) => {
      if (log.id) delete log.id;
    });
    expect(ee).toMatchObject(other);
  }

  it('should match ethers.js -- address, from, to', async () => {
    const [eeLogs, ethersLogs] = await Promise.all([
      essentialEthProvider.getLogs(filterAddressFromTo),
      ethersProvider.getLogs(filterAddressFromTo),
    ]);
    testLogEquality(eeLogs, ethersLogs);
  });
  it('should match ethers.js -- address, topics', async () => {
    const [eeLogs, ethersLogs] = await Promise.all([
      essentialEthProvider.getLogs(filterAddressTopics),
      ethersProvider.getLogs(filterAddressTopics),
    ]);
    testLogEquality(eeLogs, ethersLogs);
  });
  it('should match ethers.js -- address, topics, from, to', async () => {
    const [eeLogs, ethersLogs] = await Promise.all([
      essentialEthProvider.getLogs(filterAll),
      ethersProvider.getLogs(filterAll),
    ]);
    testLogEquality(eeLogs, ethersLogs);
  });
  it('should match web3.js -- address, from, to', async () => {
    const [eeLogs, web3Logs] = await Promise.all([
      essentialEthProvider.getLogs(filterAddressFromTo),
      web3Provider.eth.getPastLogs(filterAddressFromTo),
    ]);
    testLogEquality(eeLogs, web3Logs);
  });
  it('should match web3.js -- address, topics', async () => {
    const [eeLogs, web3Logs] = await Promise.all([
      essentialEthProvider.getLogs(filterAddressTopics),
      web3Provider.eth.getPastLogs(filterAddressTopics),
    ]);
    testLogEquality(eeLogs, web3Logs);
  });
  it('should match web3.js -- address, topics, from, to', async () => {
    const [eeLogs, web3Logs] = await Promise.all([
      essentialEthProvider.getLogs(filterAll),
      web3Provider.eth.getPastLogs(filterAll),
    ]);
    testLogEquality(eeLogs, web3Logs);
  });
});
