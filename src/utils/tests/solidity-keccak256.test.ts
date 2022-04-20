import { utils } from 'ethers';
import { solidityKeccak256 } from '../../index';

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
  it('should match ethers.js integers', () => {
    const inputs = [
      { types: ['int16'], values: [-1] },
      { types: ['uint48'], values: [12] },
      { types: ['int16', 'uint48'], values: [-1, 12] },
    ];
    inputs.forEach((input) => {
      expect(solidityKeccak256(input.types, input.values)).toBe(
        utils.solidityKeccak256(input.types, input.values),
      );
    });
  });
});