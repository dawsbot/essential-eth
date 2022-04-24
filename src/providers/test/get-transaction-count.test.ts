import { ethers } from 'ethers';
import Web3 from 'web3';
import { JsonRpcProvider } from '../..';
import { BlockTag } from '../../types/Block.types';
import { rpcUrls } from './rpc-urls';

// coinbase 1 hotwallet
const address = '0x71660c4005ba85c37ccec55d0c4493e66fe775d3';
async function testGetTC(rpcUrl: string, blockTag?: BlockTag) {
  const eeProvider = new JsonRpcProvider(rpcUrl);
  const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);
  const [eeTC, ethersTC, web3TC] = await Promise.all([
    eeProvider.getTransactionCount(address, blockTag),
    ethersProvider.getTransactionCount(address, blockTag),
    web3Provider.eth.getTransactionCount(address, blockTag as any),
  ]);
  if (typeof blockTag === 'number') {
    // a magic-number, no significance
    expect(eeTC).toBe(1053312);
  }
  expect(eeTC).toBe(ethersTC);
  expect(eeTC).toBe(web3TC);
}
describe('provider.getBalance gno', () => {
  const rpcUrl = rpcUrls.mainnet;
  it('should get latest equal to ethers and web3', async () => {
    await testGetTC(rpcUrl, 'latest');
  });
  it('should get default latest equal to ethers and web3', async () => {
    await testGetTC(rpcUrl);
  });
  it('should get earliest equal to ethers and web3', async () => {
    await testGetTC(rpcUrl, 'earliest');
  });
  it('should tx count up to block number equal to ethers and web3', async () => {
    await testGetTC(rpcUrl, 14649390);
  });
});
