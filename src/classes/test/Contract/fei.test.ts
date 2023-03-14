import type { TinyBig } from '../../..';
import { JsonRpcProvider } from '../../../index';
import { Contract as EssentialEthContract } from '../../Contract';
import { rpcUrls } from './../../../providers/test/rpc-urls';
import { feiABI } from './fei-abi';

// The JSONABI
const JSONABI = feiABI;

const rpcURL = rpcUrls.mainnet;
const essentialEthProvider = new JsonRpcProvider(rpcURL);

// https://etherscan.io/address/0xBFfB152b9392e38CdDc275D818a3Db7FE364596b
const contractAddress = '0xBFfB152b9392e38CdDc275D818a3Db7FE364596b';

const smartContractGetFeiAmountsToRedeem = async (
  contract: EssentialEthContract,
  address: string,
) => {
  const merkleRoot = (await contract.getAmountsToRedeem(address)) as TinyBig[];
  return merkleRoot;
};

const essentialEthContract = new EssentialEthContract(
  contractAddress,
  JSONABI,
  essentialEthProvider,
);
describe('fEI contract', () => {
  it('should fetch unclaimed amounts "[uint256, uint256, uint256]" data-type', async () => {
    const essentialEthResponse = await smartContractGetFeiAmountsToRedeem(
      essentialEthContract,
      '0xf5dBA31743ea341057280bb3AdD5c2Fb505BDC4C',
    );
    expect(essentialEthResponse[0].toString()).toBe('0');
    expect(essentialEthResponse[1].toString()).toBe('0');
    expect(essentialEthResponse[2].toString()).toBe('0');
    expect(essentialEthResponse[2].toNumber()).toBe(0);
  });
  it('should fetch "uint8" data-type', async () => {
    const essentialEthResponse = await essentialEthContract.decimals();
    expect(essentialEthResponse).toBe(18);
  });

  it('should fetch "string" name data-type', async () => {
    const essentialEthResponse = await essentialEthContract.symbol();
    expect(essentialEthResponse).toBe('FGEN');

    const essential2EthResponse = await essentialEthContract.name();
    expect(essential2EthResponse).toBe('Fei Genesis Group');
  });
});
