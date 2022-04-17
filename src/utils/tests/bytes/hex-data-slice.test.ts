import * as ethers from 'ethers';
import { hexDataSlice } from '../../bytes2';

describe('hexDataSlice', () => {
  it('numbers - matches ethers strings', () => {
    const decimalValues = ['0x123456'];
    decimalValues.forEach((decimalValue) => {
      expect(hexDataSlice(decimalValue, 0, 2)).toStrictEqual(
        ethers.utils.hexDataSlice(decimalValue, 0, 2),
      );
    });
  });
  it('numbers - matches ethers hex numbers', () => {
    const decimalValues = [0x12345];
    decimalValues.forEach((decimalValue) => {
      expect(hexDataSlice(decimalValue, 10)).toStrictEqual(
        ethers.utils.hexDataSlice(decimalValue as any, 10),
      );
    });
  });
  it('numbers - matches ethers decimals', () => {
    const decimalValues = [12345];
    decimalValues.forEach((decimalValue) => {
      expect(hexDataSlice(decimalValue, 1, 2)).toStrictEqual(
        ethers.utils.hexDataSlice(decimalValue as any, 1, 2),
      );
    });
  });
  // it('should reject strings passed in which are not hex strings', () => {
  //   const value = '52908';
  //   expect(() => {
  //     hexDataSlice(value, 23);
  //   }).toThrow();
  //   // );
  //   // `value is not a hex string or number. Consider prepending with "0x" (value="${value}")`,
  // });
  // it('should throw error when value is already longer than desired length', () => {
  //   const hexValues = [0x123456, '0x5aAebAd', '0xfB691', '0xD1220ab'];
  //   hexValues.forEach((hexValue) => {
  //     expect(() => hexDataSlice(hexValue, 2)).toThrow();
  //     // `value is longer than length (hexValue=${hexValue}, length=${2})`,
  //     // );
  //   });
  // });
  // it('should match ethers.js when padding can be applied', () => {
  //   const values = [
  //     10,
  //     '0x5290',
  //     '0x8617E3',
  //     '0xde709f210',
  //     '0x27b',
  //     0x0,
  //     0x5aaeb605,
  //     '0xfB6916095ca1df',
  //     '0xdbF03B407c01E7cD3CBea99509d93',
  //     0xd1220a0cf4,
  //   ];
  //   values.forEach((value) => {
  //     expect(hexDataSlice(value, 30)).toStrictEqual(
  //       // @ts-ignore
  //       ethers.utils.hexDataSlice(value, 30),
  //     );
  //   });
  // });
});
