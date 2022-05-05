import { utils } from 'ethers';
import { computeAddress } from '../../index';

describe('computeAddress', () => {
  it('should match ethers.js - public key', () => {
    const publicKey =
      '0x04aaa2abcf8d119ad68b2c190abf34355a0029197911e2446007d5b44e6fddfd54352326fedac51eca491d59937c592ecffff65c6941037babbe26edfdbb32a688';
    expect(computeAddress(publicKey)).toBe(utils.computeAddress(publicKey));
  });
  it('should match ethers.js - private key', () => {
    const privateKey =
      '0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f'; // example private key from http://www.herongyang.com/Ethereum/Etheruem-Account-Public-Private-Key-Example.html
    expect(computeAddress(privateKey)).toBe(utils.computeAddress(privateKey));
  });
});
