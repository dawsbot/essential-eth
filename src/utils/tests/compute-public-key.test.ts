import { utils } from 'ethers';
import { computePublicKey } from '../../index';

describe('computePublicKey', () => {
  it('should match ethers.js', () => {
    const privateKey =
      '0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f'; // example private key from http://www.herongyang.com/Ethereum/Etheruem-Account-Public-Private-Key-Example.html
    expect(computePublicKey(privateKey)).toBe(
      utils.computePublicKey(privateKey),
    );
  });
});
