import { describe, expect, it } from 'vitest';
import { FallthroughProvider } from '../../../index';
import { Contract as EssentialEthContract } from '../../Contract';
import {
  rpcUrls,
  skipWithoutAlchemyKey,
} from './../../../providers/test/rpc-urls';
import { ensABI } from './ens-abi';

const JSONABI = ensABI;

const rpcURL = rpcUrls.mainnet;
const provider = rpcURL
  ? new FallthroughProvider([
      'nope',
      'https://flash-the-slow-api.herokuapp.com/delay/1',
      rpcURL,
    ])
  : null;

const contractAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';

const contract = provider
  ? new EssentialEthContract(contractAddress, JSONABI, provider)
  : null;

// hash of "daws" from "daws.eth"
const labelHash =
  '50169637832853779738672089874069382521487784580321107885800103657377856021675';
describe.skipIf(skipWithoutAlchemyKey)('eNS Base Registrar Expiration', () => {
  it('should detect expiration properly', async () => {
    const expiration = await contract.nameExpires(labelHash);
    expect(Number(expiration)).toBeGreaterThan(2010913632);
  });
});
