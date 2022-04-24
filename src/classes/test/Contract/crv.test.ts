import { Contract as EthersContract } from '@ethersproject/contracts';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { TinyBig } from '../../..';
import { JsonRpcProvider } from '../../../providers/JsonRpcProvider';
import { rpcUrls } from '../../../providers/test/rpc-urls';
import { Contract as EssentialEthContract } from '../../Contract';
import { abi } from './crv-abi';

// The JSONABI
const JSONABI = abi;

const rpcURL = rpcUrls.mainnet;
const ethersProvider = new StaticJsonRpcProvider(rpcURL);
const essentialEthProvider = new JsonRpcProvider(rpcURL);

// https://etherscan.io/address/0x575CCD8e2D300e2377B43478339E364000318E2c
const contractAddress = '0x575CCD8e2D300e2377B43478339E364000318E2c';

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
describe('cRV contract', () => {
  const address = '0xf8cd644baf494d13406187cf8628754dca0a10c2';
  it('should fetch "uint256" balanceOf', async () => {
    const [ethersBalanceOf, essentialEthBalanceOf] = await Promise.all([
      ethersContract.balanceOf(address, {
        gasLimit: 40955,
      }) as TinyBig,
      essentialEthContract.balanceOf(address, {
        gasLimit: 40955,
      }) as TinyBig,
    ]);
    expect(ethersBalanceOf.toString()).toBe(essentialEthBalanceOf.toString());
  });
  it('should fetch "uint256" total_claimed', async () => {
    const [ethersTotalClaimed, essentialEthTotalClaimed] = await Promise.all([
      // ensure library also handles empty options
      ethersContract.total_claimed(address, {}) as TinyBig,
      essentialEthContract.total_claimed(address, {}) as TinyBig,
    ]);
    expect(ethersTotalClaimed.toString()).toBe(
      essentialEthTotalClaimed.toString(),
    );
    expect(ethersTotalClaimed.toNumber()).toBe(
      essentialEthTotalClaimed.toNumber(),
    );
  });
});
