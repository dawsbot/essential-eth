import { utils as ethers } from 'ethers';
import { stripZeros } from '../../bytes';

describe('utils.stripZeros', () => {
  it('should match ethers.js - hex string', () => {
    const values = ['0x00009347', '0x00185754', '0x00000000005823'];
    values.forEach((value) => {
      expect(stripZeros(value)).toStrictEqual(ethers.stripZeros(value));
    });
  });
  it('should match ethers.js - UInt8Array', () => {
    const values = [
      [0, 0, 0, 9, 58, 29, 24],
      [0, 185, 203],
      [0, 0, 0, 0, 239, 30, 49, 41, 5, 10, 42],
    ];
    values.forEach((value) => {
      expect(stripZeros(value)).toStrictEqual(ethers.stripZeros(value));
    });
  });
});
