import { utils as ethers } from 'ethers';
import { hexDataLength } from '../../bytes';

describe('utils.hexDataLength', () => {
  it('should match ethers.js - hex values', () => {
    const values = ['0x9347', '0x185754', '0x00005823'];
    values.forEach((value) => {
      expect(hexDataLength(value)).toBe(ethers.hexDataLength(value));
    });
  });
  it('should match ethers.js - UInt8Array values', () => {
    const values = [
      [9, 58, 29, 24],
      [185, 203],
      [239, 30, 49, 41, 5, 10, 42],
    ];
    values.forEach((value) => {
      expect(hexDataLength(value)).toBe(ethers.hexDataLength(value));
    });
  });
  it('should return null - not hex value or not divisible by 2', () => {
    const values = ['0x383', 'non-hex string'];
    values.forEach((value) => {
      expect(hexDataLength(value)).toBeNull();
    });
  });
});
