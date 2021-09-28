import { Contract as EthersContract } from '@ethersproject/contracts';
import { getDefaultProvider } from 'ethers';
import { TinyBig } from '../../..';
import { Contract as JsonRpcProviderContract } from '../../Contract';
import { JsonRpcProvider } from '../../JsonRpcProvider';
import { feiABI } from './fei-abi';

// The JSONABI
const JSONABI = feiABI;

const rpcURL = 'https://free-eth-node.com/api/eth';
const ethersProvider = getDefaultProvider(rpcURL);
const essentialEthProvider = new JsonRpcProvider(rpcURL);

// The UNI airdrop merkle address
// https://etherscan.io/address/0xBFfB152b9392e38CdDc275D818a3Db7FE364596b
const contractAddress = '0xBFfB152b9392e38CdDc275D818a3Db7FE364596b';

const smartContractGetFeiAmountsToRedeem = async (
  contract: any,
  address: string,
) => {
  const merkleRoot = (await contract.getAmountsToRedeem(address)) as TinyBig[];
  return merkleRoot;
};

const ethersContract = new EthersContract(
  contractAddress,
  JSONABI,
  ethersProvider,
);
const essentialEthContract = new JsonRpcProviderContract(
  contractAddress,
  JSONABI,
  essentialEthProvider,
);
describe('FEI contract', () => {
  it('should fetch unclaimed amounts "[uint256, uint256, uint256]" data-type', async () => {
    const [ethersResponse, essentialEthResponse] = await Promise.all([
      smartContractGetFeiAmountsToRedeem(
        ethersContract,
        '0xf5dBA31743ea341057280bb3AdD5c2Fb505BDC4C',
      ),
      smartContractGetFeiAmountsToRedeem(
        essentialEthContract,
        '0xf5dBA31743ea341057280bb3AdD5c2Fb505BDC4C',
      ),
    ]);
    expect(ethersResponse[0].toString()).toStrictEqual(
      essentialEthResponse[0].toString(),
    );
    expect(ethersResponse[1].toString()).toStrictEqual(
      essentialEthResponse[1].toString(),
    );
    expect(ethersResponse[2].toString()).toStrictEqual(
      essentialEthResponse[2].toString(),
    );

    expect(essentialEthResponse[0].toNumber()).toStrictEqual(
      611330334598773765981,
    );
    expect(essentialEthResponse[1].toNumber()).toStrictEqual(
      46931053833712274879,
    );
    expect(essentialEthResponse[2].toNumber()).toStrictEqual(0);
  });
});
