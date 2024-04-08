import { describe, expect, it } from 'vitest';
import { FallthroughProvider } from '../../../index';
import { Contract as EssentialEthContract } from '../../Contract';
import { rpcUrls } from './../../../providers/test/rpc-urls';
import { ensABI } from './ens-abi';

const JSONABI = ensABI;

const rpcURL = rpcUrls.mainnet;
const provider = new FallthroughProvider([
  'nope',
  'https://flash-the-slow-api.herokuapp.com/delay/1',
  rpcURL,
]);

const contractAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';

const contract = new EssentialEthContract(contractAddress, JSONABI, provider);

// hash of "daws" from "daws.eth"
const labelHash =
  '50169637832853779738672089874069382521487784580321107885800103657377856021675';
describe('eNS Base Registrar Expiration', () => {
  it('should detect expiration properly', async () => {
    const expiration = await contract.nameExpires(labelHash);
    expect(expiration.toNumber()).toBeGreaterThan(2010913632);
  });
});
