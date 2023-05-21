import { hexlify } from '../../bytes';
import type { BytesLike } from './../../bytes';

describe('utils.hexlify', () => {
  it('matches expected strings - numbers', () => {
    const testCases = [
      { value: 0, expected: '0x00' },
      { value: 4, expected: '0x04' },
      { value: 5, expected: '0x05' },
      { value: 16, expected: '0x10' },
      { value: BigInt(0), expected: '0x00' },
      { value: BigInt(16), expected: '0x10' },
    ];

    testCases.forEach((testCase) => {
      expect(hexlify(testCase.value)).toBe(testCase.expected);
    });
  });
  it('should hexlify with options - hexPad', () => {
    const testCases = [
      { value: '0x3342e95', options: { hexPad: 'left' }, expected: '0x03342e95' },
      { value: '0x41c942c42', options: { hexPad: 'right' }, expected: '0x41c942c420' },
    ];
    testCases.forEach((testCase) => {
      expect(hexlify(testCase.value, testCase.options as any)).toBe(testCase.expected);
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
      expect(() => hexlify(value as BytesLike)).toThrow('invalid hexlify value');
    });
  });
});
