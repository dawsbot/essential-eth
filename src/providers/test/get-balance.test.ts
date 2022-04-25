import { ethers } from 'ethers';
import Web3 from 'web3';
import { JsonRpcProvider } from '../..';
import { BlockTag } from '../../types/Block.types';
import { rpcUrls } from './rpc-urls';

const address = '0x0000000000000000000000000000000000000000';
async function testGetBalance(rpcUrl: string, blockTag?: BlockTag) {
  const eeProvider = new JsonRpcProvider(rpcUrl);
  const ethersProvider = new ethers.providers.StaticJsonRpcProvider(rpcUrl);
  const web3Provider = new Web3(rpcUrl);
  const [eeBalance, ethersBalance, web3Balance] = await Promise.all([
    eeProvider.getBalance(address, blockTag),
    ethersProvider.getBalance(address, blockTag),
    web3Provider.eth.getBalance(address, blockTag as any),
  ]);
  expect(eeBalance.toString()).toBe(ethersBalance.toString());
  expect(eeBalance.toString()).toBe(web3Balance);
}
describe('provider.getBalance gno', () => {
  const rpcUrl = rpcUrls.mainnet;
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
describe('provider.getBalance arbitrum', () => {
  const rpcUrl = rpcUrls.gor;
  it('should get latest equal to ethers', async () => {
    await testGetBalance(rpcUrl, 'latest');
  });
  it('should get earliest equal to ethers', async () => {
    await testGetBalance(rpcUrl, 'earliest');
  });
  it('should get pending equal to ethers', async () => {
    await testGetBalance(rpcUrl, 'pending');
  });
  it('should get default latest equal to ethers', async () => {
    await testGetBalance(rpcUrl);
  });
});

// describe('provider.getNetwork error handling', () => {
//   it('should throw on empty 200 http response', async () => {
//     expect.assertions(1);
//     const essentialEth = new JsonRpcProvider(fakeUrls.notRPCButRealHttp);
//     await essentialEth.getNetwork().catch((err) => {
//       expect(err instanceof Error).toBe(true);
//     });
//   });
// });
