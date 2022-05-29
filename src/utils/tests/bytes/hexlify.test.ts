import { utils as ethers } from 'ethers';
import { hexlify } from '../../bytes';
import { BytesLike } from './../../bytes';

describe('utils.hexlify', () => {
  it('numbers - matches ethers strings', () => {
    const decimalValues = [0, 4, 5, 16, BigInt(0), BigInt(16)];
    decimalValues.forEach((decimalValue) => {
      expect(hexlify(decimalValue)).toBe(ethers.hexlify(decimalValue));
    });

    const opts = { allowMissingPrefix: true };
    expect(hexlify('22', opts)).toBe(ethers.hexlify('22', opts));
  });
  it('should match ethers.js - hexPad options', () => {
    const values = [
      ['0x3342e95', { hexPad: 'left' }],
      ['0x41c942c42', { hexPad: 'right' }],
    ];
    values.forEach((value) => {
      expect(hexlify(value[0] as any, value[1] as any)).toBe(
        ethers.hexlify(value[0] as any, value[1] as any),
      );
    });
  });
  it('should throw error - hex data is odd-length', () => {
    const values = ['0x931', '0x34414'];
    values.forEach((value) => {
      expect(() => hexlify(value)).toThrow('hex data is odd-length');
    });
  });
  it('should throw error - invalid hexlify value', () => {
    const values = ['non-hex string', false];
    values.forEach((value) => {
      expect(() => hexlify(value as BytesLike)).toThrow(
        'invalid hexlify value',
      );
    });
  });
});
