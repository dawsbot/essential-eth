import { utils } from 'ethers';
import { computeAddress } from '../../index';

function testComputeAddress(keys: Array<string>) {
  keys.forEach((key) => {
    expect(computeAddress(key)).toBe(utils.computeAddress(key));

  })
}

describe('computeAddress', () => {
  it('should match ethers.js - public key', () => {
    const publicKeys = [
      '0x04aaa2abcf8d119ad68b2c190abf34355a0029197911e2446007d5b44e6fddfd54352326fedac51eca491d59937c592ecffff65c6941037babbe26edfdbb32a688',
      '0x42e12f76412f53de9d60df199a368699b6ec15d3798efb0b2a45b8c1b4f902a6',
      '0x262f8fffb353d3e11be770dd4208dcab1fa5c205d574a78088829f45b1ac2487',
      '0x1bcfb8b7a46e2f886ef61f8010426f70ce3c7fc1362973aa26d30b8f77711d93'
    ]
    testComputeAddress(publicKeys)
  });
  it('should match ethers.js - private key', () => {
    const privateKeys = [
      '0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f', // example private key from http://www.herongyang.com/Ethereum/Etheruem-Account-Public-Private-Key-Example.html
      '0x04e8aa3d196e3a785fb5b431265074c01f571a79231e0cc0fc28e67d9c648471aca8229cafcc6cd806cd1a679f538326577bf9485c68f7a1c90b5116b669f30473',
      '0x04110dfa471c3f04a6c9dfd857705eb080542c9672cf0f30d95f5fca382181293d6e91320916dd649d03c76818af8e7ee173781888e42e2f00bda9a8f797e0fd61',
      '0x04593bea29e692123fda1b6f8280b8414524c7838fd448abe6dd1e072bee5e2e9c66e19976b9310ce514d8612c5736201ddc3bb966412076cd4b24e7f649e779b3',
    ]
    testComputeAddress(privateKeys)
    });
});
