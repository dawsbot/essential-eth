import type { BytesLike } from './../bytes';
import { keccak256 } from './../keccak256';
import { toUtf8Bytes } from './../to-utf8-bytes';

/**
 *
 * @param inputs
 * @param expected
 */
function testKeccak256(inputs: Array<BytesLike>, expected: Array<string>) {
  inputs.forEach((input, index) => {
    expect(keccak256(input)).toBe(expected[index]);
  });
}

describe('keccak256', () => {
  it('should match expected - hex strings', () => {
    const inputs = [
      '0x72fe4a1287bb827ec8d04e045f7559955a8e694063af513008f111670674178a',
      '0xB5503a7db1A9105cd459D99153e69a76a8EF1530',
      '0xaa0fc255b079e775f9307e5cfec472a555cebc3a',
    ];
    const expected = [
      '0xdfd0cc524dd738b88971b1317b30e6a13c9295469197dee0663ebc4b05e5221e',
      '0x012d02a94561e140985a0382377e7676eec97a73007e188ffd1d0a0c01b1eb4d',
      '0xfe9ee1df3c10848ed968a46ced4a0bb9674195ece0cfc63959d8058d77700d84',
    ];
    testKeccak256(inputs, expected);
  });
  it('should match expected - bytes', () => {
    const inputs = [[2, 182, 145], [0, 16, 255], [0x12, 0x34], [0x12]];
    const expected = [
      '0x324544acf03f9c2ac85ab3a820ab3371bf7965a342bcdd5f74e28eb6d1f60050',
      '0xfe10bfcde301e8b760615ba65ba2a0c7fb72f9bcdea7c45841ef7b355a443e51',
      '0x56570de287d73cd1cb6092bb8fdee6173974955fdef345ae579ee9f475ea7432',
      '0x5fa2358263196dbbf23d1ca7a509451f7a2f64c15837bfbb81298b1e3e24e4fa',
    ];
    testKeccak256(inputs, expected);
  });

  it('should match expected - numbers', () => {
    const inputs = [23874234, 123346, 12395712].map((n) =>
      toUtf8Bytes(n.toString()),
    );
    const expected = [
      '0x6cc5c464579b7e93f9e3192ecad21e933e5497d24a067546a264874a1cdbe48d',
      '0xf54c8ff9e4afcd296f686a15dda3b8f9f2da621866842b2427ab578e0aaa7344',
      '0xd9ba3a9f9b521946abbae91c3799ac03a3ec95d2a69a5ab5974242d36e3c6f32',
    ];
    testKeccak256(inputs, expected);
  });

  it('should match expected  - strings', () => {
    const inputs = [
      'essential-eth',
      'firstText',
      'secondString',
      'example1',
      '2934823',
      'true',
    ].map(toUtf8Bytes);
    const expected = [
      '0xd5b027dc2bddae7475604f19ca210363f0a3c63a32d79c2fff540b9c21249f2c',
      '0x3b0c4ce69832f4f4036e87bf56b9062018040b5b0f031062bd9667fb579c844f',
      '0x2f33a7c2165d73854f66613815214ba5812046579723927d001cabe696078ae7',
      '0xf5590342e9e60df9335478edb075a7c323b2e11d690d18d35eaa32f13e48788d',
      '0x0517ce0ae90a6a7f7f4770d867e1fc57e38e7f1d133942fdbcbabe53c98d3761',
      '0x6273151f959616268004b58dbb21e5c851b7b8d04498b4aabee12291d22fc034',
    ];
    testKeccak256(inputs, expected);
  });
  // it('should match ethers.js bytes (dynamic size) & BytesLike', () => {
  //   const inputs = [
  //     [115, 101, 99, 114, 101, 116],
  //     ['0x62797465734c696b65'],
  //     '0x657373656e7469616c2d657468',
  //     [115, 109, 97, 108, 108, 101, 115, 116],
  //   ];
  //   testKeccak256(inputs);
  // });
  // it('should match ethers.js bytes (static size)', () => {
  //   const inputs = [
  //     { types: ['bytes4'], values: [[116, 101, 115, 116]] },
  //     {
  //       types: ['bytes13', 'bytes1', 'bytes2', 'bytes5', 'bytes1'],
  //       values: [
  //         [101, 115, 115, 101, 110, 116, 105, 97, 108, 45, 101, 116, 104],
  //         [32],
  //         [105, 115],
  //         [103, 114, 101, 97, 116],
  //         [33],
  //       ],
  //     },
  //   ];
  //   testKeccak256(inputs);
  // });
  // it('should match ethers.js (signed and unsigned) integers', () => {
  //   const inputs = [
  //     { types: ['int16'], values: [-1] },
  //     { types: ['uint48'], values: [12] },
  //     { types: ['int16', 'uint48'], values: [-1, 12] },
  //   ];
  //   testKeccak256(inputs);
  // });
});
