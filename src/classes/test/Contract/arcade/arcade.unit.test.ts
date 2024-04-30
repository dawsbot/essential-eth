import { describe, expect, it } from 'vitest';
import type { JSONABIArgument } from '../../../../types/Contract.types';
import { encodeData } from '../../../utils/encode-decode-transaction';
import abi from './arcade.abi.json';

describe('arcade DAO contract', () => {
  it('should encode [address, bytes32]', async () => {
    const evmAddress = '0xE38a6F2045738Ea9F5Ad425E63537BA7679Eb82e';
    const merkleRoot =
      '0x9c76bb33425ea109e9bddd5ff9e97d10de0dc8de5d123a7c288f8387a4b2ba2d';
    // this was captured by running it on the live network first
    const mockEncoded =
      '0x0f2d940b000000000000000000000000e38a6f2045738ea9f5ad425e63537ba7679eb82e9c76bb33425ea109e9bddd5ff9e97d10de0dc8de5d123a7c288f8387a4b2ba2d';
    const args = [evmAddress, merkleRoot];
    const jsonABIArgument = abi.find(
      (abi) => abi.name === 'claimed',
    ) as JSONABIArgument;
    const encoded = encodeData(jsonABIArgument, args);
    expect(encoded).toBe(mockEncoded);
  });
});
