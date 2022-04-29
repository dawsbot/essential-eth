import { utils } from 'ethers';
import { keccak256 } from './../keccak256';

function testSolidityKeccak256(inputs: Array<string>) {
  inputs.forEach((input) => {
    expect(keccak256(input)).toBe(utils.keccak256(input));
  });
}
describe('solidityKeccak256', () => {
  it('should match ethers.js addresses', () => {
    const inputs = [
      '0x4d7F1790644Af787933c9fF0e2cff9a9B4299Abb',
      '0xB5503a7db1A9105cd459D99153e69a76a8EF1530',
      '0xaa0fc255b079e775f9307e5cfec472a555cebc3a',
    ];
    testSolidityKeccak256(inputs);
  });
  // it('should match ethers.js strings', () => {
  //   const inputs = [
  //     'essential-eth',
  //     'firstText',
  //     'secondString',
  //     'example1',
  //     '2934823',
  //     'true',
  //   ];
  //   testSolidityKeccak256(inputs);
  // });
  // it('should match ethers.js bytes (dynamic size) & BytesLike', () => {
  //   const inputs = [
  //     [115, 101, 99, 114, 101, 116],
  //     ['0x62797465734c696b65'],
  //     '0x657373656e7469616c2d657468',
  //     [115, 109, 97, 108, 108, 101, 115, 116],
  //   ];
  //   testSolidityKeccak256(inputs);
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
  //   testSolidityKeccak256(inputs);
  // });
  // it('should match ethers.js (signed and unsigned) integers', () => {
  //   const inputs = [
  //     { types: ['int16'], values: [-1] },
  //     { types: ['uint48'], values: [12] },
  //     { types: ['int16', 'uint48'], values: [-1, 12] },
  //   ];
  //   testSolidityKeccak256(inputs);
  // });
});
