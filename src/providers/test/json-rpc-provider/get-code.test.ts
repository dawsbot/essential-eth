import * as unfetch from 'isomorphic-unfetch';
import { JsonRpcProvider, tinyBig } from '../../../index';
import { rpcUrls } from './../rpc-urls';
import { mockOf } from '../mock-of';
import { buildFetchInit, buildRPCPostBody } from '../../../classes/utils/fetchers';

// Using Polygon to be able to access archive blocks
// Choosing to use Ethereum mainnet means that as new blocks are generated, block numbers used in testing may be inaccessible and cause tests to fail
const rpcUrl = rpcUrls.matic;

// can't test for earliest block (at least for Ethereum) as it's very unlikely there was a smart contract on the first block
const inputs = [
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

const mockCodeResult = '0x06060060600606006060060600606006060'

describe('provider.getCode', () => {
  const provider = new JsonRpcProvider(rpcUrl);

  it('should return `0x` when a contract does not exist', async () => {
    jest.unmock('isomorphic-unfetch');
    const invalidInput = {
      address: '0xd31a02A126Bb7ACD359BD61E9a8276959408855E',
      blockTag: 28314328,
    };
    const code = await provider.getCode(
      invalidInput.address,
      invalidInput.blockTag,
    );
    expect(code).toBe('0x');
  });

  it('should return the correct code for the given input', async () => {
    const spy = jest.spyOn(unfetch, 'default');
    spy.mockImplementation((url) => {
      const mockResponse = new Response(
        JSON.stringify({ jsonrpc: '2.0', id: 1, result: mockCodeResult })
      );
      return Promise.resolve(mockResponse);
    });
    for (const input of inputs) {
      jest.spyOn(unfetch, 'default').mockImplementation(() =>
      Promise.resolve({
      json: () => Promise.resolve({result: mockCodeResult}),
        })
      );
      
      const code = await provider.getCode(input.address, input.blockTag);

      expect(code).toBe(mockCodeResult);

      const expectedBlockTag = typeof input.blockTag === 'number'
        ? tinyBig(input.blockTag).toHexString()
        : input.blockTag ?? 'latest';
      expect(spy).toHaveBeenCalledWith(
        rpcUrl,
        buildFetchInit(buildRPCPostBody('eth_getCode', [input.address, expectedBlockTag])),
      );
    }
  });

});
