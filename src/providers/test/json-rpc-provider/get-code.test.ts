import * as unfetch from 'isomorphic-unfetch';
import {
  buildFetchInit,
  buildRPCPostBody,
} from '../../../classes/utils/fetchers';
import { JsonRpcProvider, tinyBig } from '../../../index';
import { rpcUrls } from './../rpc-urls';

// Using Polygon to be able to access archive blocks
// Choosing to use Ethereum mainnet means that as new blocks are generated, block numbers used in testing may be inaccessible and cause tests to fail
const rpcUrl = rpcUrls.matic;
vi.mock('isomorphic-unfetch');

// can't test for earliest block (at least for Ethereum) as it's very unlikely there was a smart contract on the first block
interface InputType {
  address: string;
  blockTag: number | string | undefined;
}
const validInputs: InputType[] = [
  {
    address: '0x00153ab45951268d8813BCAb403152A059B99CB1',
    blockTag: undefined,
  },
  {
    address: '0xF6c506F64Fa4bbF64a6b4539506abadF8C7f16b8',
    blockTag: 'latest',
  },
  {
    address: '0x97f589D427c4DFA48e3F3F50Ff0C5b49334DdE22',
    blockTag: '0xe1e51d',
  },
  {
    address: '0x3c9D4Ea65b59BEa7178c62d403d560f938221f9d',
    blockTag: 28114328,
  },
];
const invalidInput: InputType = {
  address: '0xd31a02A126Bb7ACD359BD61E9a8276959408855E',
  blockTag: 28314328,
};

const mockCodeResult = '0x06060060600606006060060600606006060';
const mockInvalidResult = '0x';

const provider = new JsonRpcProvider(rpcUrl);

async function testGetCode(input: InputType, mockResult: string) {
  const spy = vi.spyOn(unfetch, 'default');
  spy.mockResolvedValueOnce({
    text: () =>
      Promise.resolve(
        JSON.stringify({ jsonrpc: '2.0', id: 1, result: mockResult }),
      ),
  } as Response);

  const code = await provider.getCode(input.address, input.blockTag);

  expect(code).toBe(mockResult);

  const expectedBlockTag =
    typeof input.blockTag === 'number'
      ? tinyBig(input.blockTag).toHexString()
      : input.blockTag ?? 'latest';
  expect(spy).toHaveBeenCalledWith(
    rpcUrl,
    buildFetchInit(
      buildRPCPostBody('eth_getCode', [input.address, expectedBlockTag]),
    ),
  );
}

describe('provider.getCode with Mock', () => {
  it('should return the correct code for the given input', async () => {
    for (const input of validInputs) {
      await testGetCode(input, mockCodeResult);
    }
  });

  it('should return `0x` when a contract does not exist', async () => {
    await testGetCode(invalidInput, mockInvalidResult);
  });
});
