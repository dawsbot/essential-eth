import { Contract as EthersContract } from '@ethersproject/contracts';
import { getDefaultProvider } from 'ethers';
import { Contract as EssentialEthContract } from '../Contract';
import { EssentialEth } from '../EssentialEth';
import { uniswapABI } from './uniswap-abi';

// The JSONABI
const JSONABI = uniswapABI;

const rpcURL = 'https://free-eth-node.com/api/eth';
const ethersProvider = getDefaultProvider(rpcURL);
const essentialEthProvider = new EssentialEth(rpcURL);

// The UNI merkle address
const contractAddress = '0x090D4613473dEE047c3f2706764f49E0821D256e';

const smartContractIsUniClaimed = async (contract: any, index: number) => {
  const isClaimed = (await contract.isClaimed(index)) as boolean;
  return isClaimed;
};

describe('check isClaimed on UNI contract', () => {
  it('should be claimed', async () => {
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

    const randomNumbers = [0, 4, 102, 999, 999999];

    randomNumbers.forEach(async (num) => {
      const [ethersClaimed, essentialEthClaimed] = await Promise.all([
        smartContractIsUniClaimed(ethersContract, num),
        smartContractIsUniClaimed(essentialEthContract, num),
      ]);
      expect(ethersClaimed).toStrictEqual(essentialEthClaimed);
    });
  });
});
