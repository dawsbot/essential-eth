import { hexDataSlice } from '../../bytes';

describe('utils.hexDataSlice', () => {
  it('should match expected slice - hexadecimal strings', () => {
    const hexValues = ['0x123456'];
    hexValues.forEach((hexValue) => {
      expect(hexDataSlice(hexValue, 0, 2)).toBe('0x1234');
    });
  });

  it('should match expected slice -  hexadecimal numbers', () => {
    const hexValues = [0x1234567891011];
    hexValues.forEach((hexValue) => {
      expect(hexDataSlice(hexValue, 3)).toBe('0x67891011');
      expect(hexDataSlice(hexValue, 2, 4)).toBe('0x4567');
      expect(hexDataSlice(hexValue, 100)).toBe('0x');
    });
  });

  it('should match expected slice - arrays of decimal numbers', () => {
    const decimalArrays = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]];
    decimalArrays.forEach((decimalArray) => {
      expect(hexDataSlice(decimalArray, 1, 2)).toBe('0x01');
    });
  });

  it('should throw error - invalid hex data', () => {
    const values = ['non-hex string', '0x938'];
    values.forEach((value) => {
      expect(() => hexDataSlice(value, 1, 3)).toThrow('invalid hexData');
    });
  });
});
