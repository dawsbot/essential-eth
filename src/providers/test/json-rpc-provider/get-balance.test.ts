import { ethers } from 'ethers';
import Web3 from 'web3';
import { JsonRpcProvider } from '../../..';
import type { BlockTag } from '../../../types/Block.types';
import { rpcUrls } from '../rpc-urls';

const address = '0x0000000000000000000000000000000000000001';
async function testGetBalance(rpcUrl: string, blockTag?: BlockTag) {
  const eeProvider = new JsonRpcProvider(rpcUrl);
  const ethersProvider = new ethers.JsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);
  const [eeBalance, ethersBalance, web3Balance] = await Promise.all([
    eeProvider.getBalance(address, blockTag),
    ethersProvider.getBalance(address, blockTag),
    web3Provider.eth.getBalance(address, blockTag as any),
  ]);
  expect(eeBalance.toString()).toBe(ethersBalance.toString());
  expect(eeBalance.toString()).toBe(web3Balance);
}
describe('provider.getBalance matic', () => {
  const rpcUrl = rpcUrls.matic;
  it('should get latest equal to ethers', async () => {
    await testGetBalance(rpcUrl, 'latest');
  });
  it('should get earliest equal to ethers', async () => {
    await testGetBalance(rpcUrl, 'earliest');
  });
  it('should get default latest equal to ethers', async () => {
    await testGetBalance(rpcUrl);
  });
});
