import { utils } from 'ethers';
import { solidityKeccak256 } from '../../index';

function testSolidityKeccak256(inputs: Array<any>) {
  inputs.forEach((input) => {
    expect(solidityKeccak256(input.types, input.values)).toBe(
      utils.solidityKeccak256(input.types, input.values),
    );
  });
}
describe('solidityKeccak256', () => {
  // it('should reject when number of types does not equal number of values', () => {
  //   const inputs = [
  //     { types: ['string'], values: [] },
  //     { types: ['number', 'boolean'], values: [239] },
  //     { types: ['number', 'boolean'], values: [239, false, 'essential-eth'] },
  //   ];
  //   inputs.forEach((input) => {
  //     expect(() => solidityKeccak256(input.types, input.values)).toThrow(
  //       `Number of types and values should be the same.`,
  //     );
  //   });
  // });
  // it('should reject when specified type does not match actual type of value', () => {
  //   const inputs = [
  //     // { types: ['string'], values: [293] },
  //     {
  //       types: ['string', 'boolean'],
  //       values: ['essential-eth', true],
  //     },
  //   ];
  //   inputs.forEach((input) => {
  //     expect(() => solidityKeccak256(input.types, input.values)).toThrow(
  //       `Specified type doesn't match actual type of value.`,
  //     );
  //   });
  // });
  // it('should match ethers.js, string', () => {
  //   const inputs = [{ types: ['string'], values: ['essential-eth'] }];
  //   inputs.forEach((input) => {
  //     expect(solidityKeccak256(input.types, input.values)).toBe(
  //       utils.solidityKeccak256(input.types, input.values),
  //     );
  //   });
  // });
  it('should match ethers.js addresses', () => {
    const inputs = [
      {
        types: ['address'],
        values: ['0x4d7F1790644Af787933c9fF0e2cff9a9B4299Abb'],
      },
      {
        types: ['address', 'address'],
        values: [
          '0xB5503a7db1A9105cd459D99153e69a76a8EF1530',
          '0xaa0fc255b079e775f9307e5cfec472a555cebc3a',
        ],
      },
    ];
    testSolidityKeccak256(inputs);
  });
  it('should match ethers.js strings', () => {
    const inputs = [
      { types: ['string'], values: ['essential-eth'] },
      { types: ['string', 'string'], values: ['firstText', 'secondString'] },
      {
        types: ['string', 'string', 'string'],
        values: ['example1', '2934823', 'true'],
      },
    ];
    testSolidityKeccak256(inputs);
  });
  it('should match ethers.js bytes (dynamic size) & BytesLike', () => {
    const inputs = [
      { types: ['bytes'], values: [[115, 101, 99, 114, 101, 116]] },
      { types: ['bytes'], values: ['0x62797465734c696b65'] }, // BytesLike string
      {
        types: ['bytes', 'bytes'],
        values: [
          '0x657373656e7469616c2d657468',
          [115, 109, 97, 108, 108, 101, 115, 116],
        ],
      },
    ];
    testSolidityKeccak256(inputs);
  });
  it('should match ethers.js bytes (static size)', () => {
    const inputs = [
      { types: ['byte4'], values: [[116, 101, 115, 116]] },
      {
        types: ['byte13', 'byte1', 'byte2', 'byte5', 'byte1'],
        values: [
          [101, 115, 115, 101, 110, 116, 105, 97, 108, 45, 101, 116, 104],
          [32],
          [105, 115],
          [103, 114, 101, 97, 116],
          [33],
        ],
      },
    ];
    testSolidityKeccak256(inputs);
  });
  it('should match ethers.js booleans (specified as type "bool" to match solidity)', () => {
    const inputs = [
      { types: ['bool'], values: [true] },
      { types: ['bool', 'bool'], values: [false, false] },
    ];
    testSolidityKeccak256(inputs);
  });
  it('should match ethers.js (signed and unsigned) integers', () => {
    const inputs = [
      { types: ['int16'], values: [-1] },
      { types: ['uint48'], values: [12] },
      { types: ['int16', 'uint48'], values: [-1, 12] },
    ];
    testSolidityKeccak256(inputs);
  });
  it('should match ethers.js ');
});
