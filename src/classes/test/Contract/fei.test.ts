import { Contract as EthersContract } from '@ethersproject/contracts';
import { getDefaultProvider } from 'ethers';
import { TinyBig } from '../../..';
import { JsonRpcProvider } from '../../../providers/JsonRpcProvider';
import { Contract as EssentialEthContract } from '../../Contract';
import { feiABI } from './fei-abi';

// The JSONABI
const JSONABI = feiABI;

const rpcURL = `${process.env.RPC_ORIGIN}/api/eth`;
const ethersProvider = getDefaultProvider(rpcURL);
const essentialEthProvider = new JsonRpcProvider(rpcURL);

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
  JSONABI as any,
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
    expect(ethersResponse[0].toString()).toStrictEqual(
      essentialEthResponse[0].toString(),
    );
    expect(ethersResponse[1].toString()).toStrictEqual(
      essentialEthResponse[1].toString(),
    );
    expect(ethersResponse[2].toString()).toStrictEqual(
      essentialEthResponse[2].toString(),
    );

    expect(essentialEthResponse[2].toNumber()).toStrictEqual(0);
  });
  it('should fetch "uint8" data-type', async () => {
    const [ethersResponse, essentialEthResponse] = await Promise.all([
      ethersContract.decimals(),
      essentialEthContract.decimals(),
    ]);
    expect(ethersResponse).toStrictEqual(essentialEthResponse);
  });

  it('should throw errors for methods using unsupported data-types', async () => {
    await expect(essentialEthContract.name()).rejects.toThrow(
      'essential-eth does not yet support "string" outputs. Make a PR today!',
    );
  });
  // it.only('should fetch "string" name data-type', async () => {
  //   const [ethersResponse, essentialEthResponse] = await Promise.all([
  //     ethersContract.symbol(),
  //     essentialEthContract.symbol(),
  //   ]);
  //   expect(ethersResponse).toStrictEqual(essentialEthResponse);

  //   const [ethers2Response, essential2EthResponse] = await Promise.all([
  //     ethersContract.name(),
  //     essentialEthContract.name(),
  //   ]);
  //   expect(ethers2Response).toStrictEqual(essential2EthResponse);
  // });
});
