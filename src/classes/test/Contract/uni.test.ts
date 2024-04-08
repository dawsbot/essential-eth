import { JsonRpcProvider } from '../../../index';
import { Contract as EssentialEthContract } from '../../Contract';
import { rpcUrls } from './../../../providers/test/rpc-urls';
import { uniswapABI } from './uniswap-abi';

const JSONABI = uniswapABI;

const rpcURL = rpcUrls.mainnet;
const provider = new JsonRpcProvider(rpcURL);

// The UNI airdrop merkle address
// https://etherscan.io/address/0x090D4613473dEE047c3f2706764f49E0821D256e#readContract
const contractAddress = '0x090D4613473dEE047c3f2706764f49E0821D256e';

const smartContractIsUniClaimed = async (
  contract: EssentialEthContract,
  index: number,
) => {
  const isClaimed = (await contract.isClaimed(index)) as boolean;
  return isClaimed;
};

const smartContractGetUniMerkleRoot = async (
  contract: EssentialEthContract,
) => {
  const merkleRoot = (await contract.merkleRoot()) as string;
  return merkleRoot;
};
const smartContractGetUniTokenAddress = async (
  contract: EssentialEthContract,
) => {
  const merkleRoot = (await contract.token()) as string;
  return merkleRoot;
};

const contract = new EssentialEthContract(contractAddress, JSONABI, provider);
describe('uNI contract', () => {
  it('should fetch "address" data-type', async () => {
    const response = await smartContractGetUniTokenAddress(contract);
    expect(response).toBe('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984');
  });
  it('should fetch "bytes32" merkle root', async () => {
    const response = await smartContractGetUniMerkleRoot(contract);
    expect(response).toBe(
      '0xc8500f8e2fcf3c9a32880e1b973fb28acc88be35787a8abcf9981b2b65dbdeb5',
    );
  });

  const testCases = [
    { index: 0, expected: false },
    { index: 4, expected: true },
    { index: 102, expected: true },
    { index: 999, expected: true },
    { index: 999999, expected: false },
  ];
  it.each(testCases)(
    'should fetch isClaimed "boolean" for airdrop index %i',
    async ({ index, expected }) => {
      const claimed = await smartContractIsUniClaimed(contract, index);
      expect(claimed).toBe(expected);
    },
  );
});
