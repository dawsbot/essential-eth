import { Contract as EthersContract } from '@ethersproject/contracts';
import { getDefaultProvider } from 'ethers';
import { TinyBig, weiToEther } from '../../..';
import { Contract as EssentialEthContract } from '../../Contract';
import { EssentialEth } from '../../EssentialEth';
import { feiABI } from './fei-abi';

// The JSONABI
const JSONABI = feiABI;

const rpcURL = 'https://free-eth-node.com/api/eth';
const ethersProvider = getDefaultProvider(rpcURL);
const essentialEthProvider = new EssentialEth(rpcURL);

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
const essentialEthContract = new EssentialEthContract(
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
    expect(weiToEther(ethersResponse[0]).toNumber()).toStrictEqual(
      weiToEther(essentialEthResponse[0]).toNumber(),
    );
    expect(weiToEther(ethersResponse[1]).toNumber()).toStrictEqual(
      weiToEther(essentialEthResponse[1]).toNumber(),
    );
    expect(weiToEther(ethersResponse[2]).toNumber()).toStrictEqual(
      weiToEther(essentialEthResponse[2]).toNumber(),
    );
  });
});
