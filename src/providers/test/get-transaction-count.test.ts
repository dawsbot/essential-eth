import { ethers } from 'ethers';
import Web3 from 'web3';
import { JsonRpcProvider } from '../..';
import { BlockTag } from '../../types/Block.types';
import { rpcUrls } from './rpc-urls';

const address = '0x0000000000000000000000000000000000000000';
async function testGetTC(rpcUrl: string, blockTag?: BlockTag) {
  const eeProvider = new JsonRpcProvider(rpcUrl);
  const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);
  const [eeTC, ethersTC, web3TC] = await Promise.all([
    eeProvider.getTransactionCount(address, blockTag),
    ethersProvider.getTransactionCount(address, blockTag),
    web3Provider.eth.getTransactionCount(address, blockTag as any),
  ]);
  expect(eeTC).toBe(ethersTC);
  expect(eeTC).toBe(web3TC);
}
describe('provider.getBalance gno', () => {
  const rpcUrl = rpcUrls.gno;
  it('should get latest equal to ethers', async () => {
    await testGetTC(rpcUrl, 'latest');
  });
});
