import { computeAddress } from '../../index';

describe('computeAddress', () => {
  it('should compute correct address - public key', () => {
    const testCases = [
      {
        key: '0x04aaa2abcf8d119ad68b2c190abf34355a0029197911e2446007d5b44e6fddfd54352326fedac51eca491d59937c592ecffff65c6941037babbe26edfdbb32a688',
        expected: '0xeC46DEeFE5e342801A5ab221471B0f934bd04404',
      },
      {
        key: '0x04e8aa3d196e3a785fb5b431265074c01f571a79231e0cc0fc28e67d9c648471aca8229cafcc6cd806cd1a679f538326577bf9485c68f7a1c90b5116b669f30473',
        expected: '0xb17351DB661e7D40723B1ADA46B43586F2358b7A',
      },
      {
        key: '0x04110dfa471c3f04a6c9dfd857705eb080542c9672cf0f30d95f5fca382181293d6e91320916dd649d03c76818af8e7ee173781888e42e2f00bda9a8f797e0fd61',
        expected: '0x93a76f1B186A97A3EBd0E1f94Ec52a82FfFD646B',
      },
      {
        key: '0x04593bea29e692123fda1b6f8280b8414524c7838fd448abe6dd1e072bee5e2e9c66e19976b9310ce514d8612c5736201ddc3bb966412076cd4b24e7f649e779b3',
        expected: '0x9eb71738aaf20F659156535b13df2b809FC8aB26',
      },
    ];

    testCases.forEach((testCase) => {
      expect(computeAddress(testCase.key)).toBe(testCase.expected);
    });
  });

  it('should compute correct address - private key', () => {
    const testCases = [
      {
        key: '0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f',
        expected: '0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377',
      },
      {
        key: '0x42e12f76412f53de9d60df199a368699b6ec15d3798efb0b2a45b8c1b4f902a6',
        expected: '0xE21C7F8e28058931C5aa0e36C42d0C40Daf7A698',
      },
      {
        key: '0x262f8fffb353d3e11be770dd4208dcab1fa5c205d574a78088829f45b1ac2487',
        expected: '0xE17826AC425D19b0531F4B99a243b9Cfb42219dd',
      },
      {
        key: '0x1bcfb8b7a46e2f886ef61f8010426f70ce3c7fc1362973aa26d30b8f77711d93',
        expected: '0xb17351DB661e7D40723B1ADA46B43586F2358b7A',
      },
    ];

    testCases.forEach((testCase) => {
      expect(computeAddress(testCase.key)).toBe(testCase.expected);
    });
  });
});
