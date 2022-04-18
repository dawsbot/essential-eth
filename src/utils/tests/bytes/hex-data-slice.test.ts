import * as ethers from 'ethers';
import { hexDataSlice } from '../../../';

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
    const decimalValues = [0x1234567891011];
    decimalValues.forEach((decimalValue) => {
      expect(hexDataSlice(decimalValue, 3)).toStrictEqual(
        ethers.utils.hexDataSlice(decimalValue as any, 3),
      );
      expect(hexDataSlice(decimalValue, 2, 4)).toStrictEqual(
        ethers.utils.hexDataSlice(decimalValue as any, 2, 4),
      );
      expect(hexDataSlice(decimalValue, 100)).toStrictEqual(
        ethers.utils.hexDataSlice(decimalValue as any, 100),
      );
    });
  });
  it('numbers - matches ethers decimals', () => {
    const decimalValues = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]];
    decimalValues.forEach((decimalValue) => {
      expect(hexDataSlice(decimalValue, 1, 2)).toStrictEqual(
        ethers.utils.hexDataSlice(decimalValue as any, 1, 2),
      );
    });
  });
});
