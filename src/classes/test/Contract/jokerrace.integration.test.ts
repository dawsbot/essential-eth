import { JsonRpcProvider } from '../../../index';
import { rpcUrls } from '../../../providers/test/rpc-urls';
import { Contract as EssentialEthContract } from '../../Contract';
import { abi } from './jokerrace-abi';

const JSONABI = abi;

const rpcURL = rpcUrls.oeth;
const essentialEthProvider = new JsonRpcProvider(rpcURL);

// https://optimistic.etherscan.io/address/0x5c11016ee4f8ad4ea2ab8b1b366f32d30d48a031#code
const contractAddress = '0x5c11016ee4f8ad4ea2ab8b1b366f32d30d48a031';

const essentialEthContract = new EssentialEthContract(
  contractAddress,
  JSONABI,
  essentialEthProvider,
);
describe('jokerrace contract', () => {
  it('should fetch "address[]"', async () => {
    const addresses = await essentialEthContract.getAllAddressesThatHaveVoted();
    expect(Array.isArray(addresses)).toBe(true);
    expect(addresses.length).toBeGreaterThan(18);
    expect(addresses).toContain('0x0b06ca5DcC8A10Be0951d4E140D4312702B8D0EC');
  });
});
