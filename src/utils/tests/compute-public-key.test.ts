import { utils } from 'ethers';
import { computePublicKey } from '../../index';

describe('computePublicKey', () => {
  it('should match ethers.js', () => {
    const privateKeys = [
      '0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f', // example private key from http://www.herongyang.com/Ethereum/Etheruem-Account-Public-Private-Key-Example.html
      '0x38a3159d73cefd392d0176c29b3cc60ff43e81813f5ab5782571511df9bb16e2', // keys from this point on were randomly generated
      '0xb6d36857e1f9b68e413d2496bb588f3650cdcc2398b3941963c44db8108b8671',
      '0xf237d9763445d41150f9a199ad93ad478dff29ad8fe6fa00149ed12f40f8eb6f']
    privateKeys.forEach((key) => {
      console.log(computePublicKey(key))
      expect(computePublicKey(key)).toBe(
        utils.computePublicKey(key),
      );
    })
  });
});
