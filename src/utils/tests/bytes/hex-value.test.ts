import { utils as ethers } from 'ethers';
import { hexValue } from '../../bytes';
import { tinyBig } from './../../../shared/tiny-big/tiny-big';

describe('utils.hexValue', () => {
  it('should match ethers.js - hex string', () => {
    const values = ['0x9347', '0x185754', '0x00005823'];
    values.forEach((value) => {
      expect(hexValue(value)).toBe(ethers.hexValue(value));
    });
  });
  it('should match ethers.js - UInt8Array', () => {
    const values = [
      [4, 50, 2],
      [231, 49, 40, 70, 19],
      [10, 68, 20, 98],
    ];
    values.forEach((value) => {
      expect(hexValue(value)).toBe(ethers.hexValue(value));
    });
  });
  it('should match ethers.js - TinyBig (hexable)', () => {
    const values = [tinyBig('29389'), tinyBig(2834), tinyBig(402)];
    values.forEach((value) => {
      expect(hexValue(value)).toBe(ethers.hexValue(value));
    });
  });
  it('should match ethers.js - number', () => {
    const values = [624, 457, 23451];
    values.forEach((value) => {
      expect(hexValue(value)).toBe(ethers.hexValue(value));
    });
  });
  it('should match ethers.js - BigInt', () => {
    const values = [BigInt(204), BigInt('23491'), BigInt(4183459235723491)];
    values.forEach((value) => {
      expect(hexValue(value)).toBe(ethers.hexValue(value));
    });
  });
  it('should return 0x0 - only zero data given', () => {
    const values = [BigInt(0), 0, '0x0000', [0, 0, 0]];
    values.forEach((value) => {
      expect(hexValue(value)).toBe('0x0');
    });
  });
});
