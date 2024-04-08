import { isBytesLike } from '../../bytes';

describe('utils.isBytesLike', () => {
  it('should return true - hex string', () => {
    const values = ['0x9347', '0x185754', '0x00005823'];
    values.forEach((value) => {
      expect(isBytesLike(value)).toBeTruthy();
    });
  });
  it('should return true - UInt8Array', () => {
    const values = [
      [9, 58, 29, 24],
      [185, 203],
      [239, 30, 49, 41, 5, 10, 42],
    ];
    values.forEach((value) => {
      expect(isBytesLike(value)).toBeTruthy();
    });
  });
  it('should return false - number', () => {
    const values = [152, 513, 2354];
    values.forEach((value) => {
      expect(isBytesLike(value)).toBeFalsy();
    });
  });
  it('should return false - non-hex string', () => {
    const values = ['essential-eth', 'ethers.js', 'ethereum'];
    values.forEach((value) => {
      expect(isBytesLike(value)).toBeFalsy();
    });
  });
  it('should return false - boolean', () => {
    const values = [false, true];
    values.forEach((value) => {
      expect(isBytesLike(value)).toBeFalsy();
    });
  });
});
