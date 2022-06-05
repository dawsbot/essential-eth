import { utils as ethers } from 'ethers';
import { zeroPad } from '../../bytes';
import type { BytesLike } from './../../bytes';

describe('utils.zeroPad', () => {
  it('should match ethers.js - hex string', () => {
    const values = [
      ['0x9347', 10],
      ['0x185754', 5],
      ['0x00005823', 7],
    ];
    values.forEach((value) => {
      expect(zeroPad(value[0] as string, value[1] as number)).toStrictEqual(
        ethers.zeroPad(value[0] as string, value[1] as number),
      );
    });
  });
  it('should match ethers.js - UInt8Array', () => {
    const values = [
      [[9, 58, 29, 24], 5],
      [[185, 203], 4],
      [[239, 30, 49, 41, 5, 10, 42], 10],
    ];
    values.forEach((value) => {
      expect(zeroPad(value[0] as BytesLike, value[1] as number)).toStrictEqual(
        ethers.zeroPad(value[0] as BytesLike, value[1] as number),
      );
    });
  });
  it('should throw error - value out of range', () => {
    const values = [
      [[9, 58, 29, 24], 3],
      ['0x185754', 1],
    ];
    values.forEach((value) => {
      expect(() => zeroPad(value[0] as BytesLike, value[1] as number)).toThrow(
        'value out of range',
      );
    });
  });
});
