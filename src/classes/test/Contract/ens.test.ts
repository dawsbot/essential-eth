import { Contract as EthersContract } from '@ethersproject/contracts';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { FallthroughProvider } from '../../../index';
import { Contract as EssentialEthContract } from '../../Contract';
import { rpcUrls } from './../../../providers/test/rpc-urls';
import { ensABI } from './ens-abi';

// The JSONABI
const JSONABI = ensABI;

const rpcURL = rpcUrls.mainnet;
const ethersProvider = new StaticJsonRpcProvider(rpcURL);
const essentialEthProvider = new FallthroughProvider([
  'nope',
  'https://flash-the-slow-api.herokuapp.com/delay/1',
  rpcURL,
]);

const contractAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';

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

// hash of "daws" from "daws.eth"
const labelHash =
  '50169637832853779738672089874069382521487784580321107885800103657377856021675';
describe('eNS Base Registrar Expiration', () => {
  it('should detect expiration properly', async () => {
    const [ethersExpiration, essentialEthExpiration] = await Promise.all([
      ethersContract.nameExpires(labelHash),
      essentialEthContract.nameExpires(labelHash),
    ]);
    expect(essentialEthExpiration.toNumber()).toBe(1853233633);
    expect(ethersExpiration.toNumber()).toBe(essentialEthExpiration.toNumber());
  });
});
