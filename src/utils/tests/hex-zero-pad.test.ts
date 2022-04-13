import * as ethers from 'ethers';
import { hexZeroPad } from '../../index';

describe('hexZeroPad', () => {
  it('numbers - matches ethers', () => {
    const values = [123, 0];
    values.forEach((value) => {
      expect(hexZeroPad(value, 30)).toStrictEqual(
        // @ts-ignore
        ethers.utils.hexZeroPad(value, 30),
      );
    });
  });
  it('should reject strings passed in which are not hex strings', () => {
    const value = '52908';
    expect(() => {
      hexZeroPad(value, 23);
    }).toThrow(
      `value is not a hex string or number. Consider prepending with "0x" (value="${value}")`,
    );
  });
  it('should throw error when value is already longer than desired length', () => {
    const values = [0x123456, '0x5aAebAd', '0xfB691', '0xD1220ab'];
    values.forEach((value) => {
      expect(() => hexZeroPad(value, 2)).toThrow(
        `value is longer than length (value=${value}, length=${2})`,
      );
    });
  });
  it('should match ethers.js when padding can be applied', () => {
    const values = [
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
