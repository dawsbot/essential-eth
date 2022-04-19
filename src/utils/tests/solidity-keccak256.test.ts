import { utils } from 'ethers';
import { solidityKeccak256 } from '../../index';

describe('solidityKeccak256', () => {
  it('should reject when number of types does not equal number of values', () => {
    const inputs = [
      { types: ['string'], values: [] },
      { types: ['number', 'boolean'], values: [239] },
      { types: ['number', 'boolean'], values: [239, false, 'essential-eth'] },
    ];
    inputs.forEach((input) => {
      expect(() => solidityKeccak256(input.types, input.values)).toThrow(
        `Number of types and values should be the same.`,
      );
    });
  });
  it('should reject when specified type does not match actual type of value', () => {
    const inputs = [
      { types: ['string'], values: [293] },
      {
        types: ['string', 'boolean', 'number'],
        values: ['essential-eth', true, '138'],
      },
      {
        types: ['address', 'bytes'],
        values: ['0x6c488470cc24d48cc308fcf33a01202485808893', 'essential-eth'],
      },
    ];
    inputs.forEach((input) => {
      expect(() => solidityKeccak256(input.types, input.values)).toThrow(
        `Specified type doesn't match actual type of value.`,
      );
    });
  });
  it('should match ethers.js', () => {
    const inputs = [
      { types: ['string'], values: ['essential-eth'] },
      { types: ['number', 'string'], values: [5283, 'essential-eth'] },
      {
        types: ['boolean', 'string', 'address'],
        values: [
          false,
          'testText',
          '0x6c488470cc24d48cc308fcf33a01202485808893',
        ],
      },
    ];
    inputs.forEach((input) => {
      expect(() => solidityKeccak256(input.types, input.values)).toStrictEqual(
        utils.solidityKeccak256(input.types, input.values),
      );
    });
  });
});
