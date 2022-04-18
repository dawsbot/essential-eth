import * as ethers from 'ethers';
import { hexZeroPad } from '../../../';

describe('hexZeroPad', () => {
  it('numbers - matches ethers', () => {
    const decimalValues = [123, 0];
    decimalValues.forEach((decimalValue) => {
      expect(hexZeroPad(decimalValue, 30)).toStrictEqual(
        // @ts-ignore
        ethers.utils.hexZeroPad(decimalValue, 30),
      );
    });
  });
  it('arrays of numbers - matches ethers', () => {
    const decimalValues = [[1, 2, 3, 4]];
    decimalValues.forEach((decimalValue) => {
      expect(hexZeroPad(decimalValue, 30)).toStrictEqual(
        ethers.utils.hexZeroPad(decimalValue, 30),
      );
    });
  });
  it('should reject strings passed in which are not hex strings', () => {
    const value = '52908';
    expect(() => {
      hexZeroPad(value, 23);
    }).toThrow();
  });
  it('should throw error when value is already longer than desired length', () => {
    const hexValues = [0x123456, '0x5aAebAd', '0xfB691', '0xD1220ab'];
    hexValues.forEach((hexValue) => {
      expect(() => hexZeroPad(hexValue, 2)).toThrow();
    });
  });
  it('should match ethers.js when padding can be applied', () => {
    const values = [
      10,
      '0x5290',
      '0x8617E3',
      '0xde709f210',
      '0x27b',
      0x0,
      0x5aaeb605,
      '0xfB6916095ca1df',
      '0xdbF03B407c01E7cD3CBea99509d93',
      0xd1220a0cf4,
    ];
    values.forEach((value) => {
      expect(hexZeroPad(value, 30)).toStrictEqual(
        // @ts-ignore
        ethers.utils.hexZeroPad(value, 30),
      );
    });
  });
});
