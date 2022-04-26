import { Contract as EthersContract } from '@ethersproject/contracts';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { JsonRpcProvider } from '../../../index';
import { Contract as EssentialEthContract } from '../../Contract';
import { rpcUrls } from './../../../providers/test/rpc-urls';
import { uniswapABI } from './uniswap-abi';

// The JSONABI
const JSONABI = uniswapABI;

const rpcURL = rpcUrls.mainnet;
const ethersProvider = new StaticJsonRpcProvider(rpcURL);
const essentialEthProvider = new JsonRpcProvider(rpcURL);

// The UNI airdrop merkle address
// https://etherscan.io/address/0x090D4613473dEE047c3f2706764f49E0821D256e#readContract
const contractAddress = '0x090D4613473dEE047c3f2706764f49E0821D256e';

type ContractLike = EthersContract | EssentialEthContract;
const smartContractIsUniClaimed = async (
  contract: ContractLike,
  index: number,
) => {
  const isClaimed = (await contract.isClaimed(index)) as boolean;
  return isClaimed;
};

const smartContractGetUniMerkleRoot = async (contract: ContractLike) => {
  const merkleRoot = (await contract.merkleRoot()) as string;
  return merkleRoot;
};
const smartContractGetUniTokenAddress = async (contract: ContractLike) => {
  const merkleRoot = (await contract.token()) as string;
  return merkleRoot;
};

const ethersContract = new EthersContract(
  contractAddress,
  JSONABI as any,
  ethersProvider,
);
const essentialEthContract = new EssentialEthContract(
  contractAddress,
  JSONABI,
  essentialEthProvider,
);
describe('uNI contract', () => {
  it('should fetch "address" data-type', async () => {
    const [ethersResponse, essentialEthResponse] = await Promise.all([
      smartContractGetUniTokenAddress(ethersContract),
      smartContractGetUniTokenAddress(essentialEthContract),
    ]);
    /* 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 */
    expect(ethersResponse).toStrictEqual(essentialEthResponse);
  });
  it('should fetch "bytes32" merkle root', async () => {
    const [ethersResponse, essentialEthResponse] = await Promise.all([
      smartContractGetUniMerkleRoot(ethersContract),
      smartContractGetUniMerkleRoot(essentialEthContract),
    ]);
    /* 0xc8500f8e2fcf3c9a32880e1b973fb28acc88be35787a8abcf9981b2b65dbdeb5 */
    expect(ethersResponse).toStrictEqual(essentialEthResponse);
  });

  it('should fetch isClaimed "boolean" for random airdrop indexes', async () => {
    /* indexes of addresses in the merkle tree */
    const randomIndexes = [0, 4, 102, 999, 999999];

    for (const i of randomIndexes) {
      const [ethersClaimed, essentialEthClaimed] = await Promise.all([
        smartContractIsUniClaimed(ethersContract, i),
        smartContractIsUniClaimed(essentialEthContract, i),
      ]);
      expect(ethersClaimed).toStrictEqual(essentialEthClaimed);
    }
  });
});
