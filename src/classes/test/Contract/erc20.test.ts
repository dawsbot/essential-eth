import { Contract as EthersContract } from '@ethersproject/contracts';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { FallthroughProvider } from '../../../index';
import { Contract as EssentialEthContract } from '../../Contract';
import { rpcUrls } from './../../../providers/test/rpc-urls';
import erc20Abi from './erc20-abi';

const uniErc20Address = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

const JSONABI = erc20Abi;

const rpcURL = rpcUrls.mainnet;
const ethersProvider = new StaticJsonRpcProvider(rpcURL);
const essentialEthProvider = new FallthroughProvider([
  'nope',
  'https://flash-the-slow-api.herokuapp.com/delay/1',
  rpcURL,
]);

const ethersContract = new EthersContract(
  uniErc20Address,
  JSONABI as any,
  ethersProvider,
);
const essentialEthContract = new EssentialEthContract(
  uniErc20Address,
  JSONABI,
  essentialEthProvider,
);

describe('uNI erc20 token contract', () => {
  it('should fetch "string" data-type', async () => {
    const [ethersName, essentialEthName] = await Promise.all([
      ethersContract.name(),
      essentialEthContract.name(),
    ]);
    expect(essentialEthName).toEqual(ethersName);
  });
});
