import { hexStripZeros } from '../../bytes';

describe('utils.hexStripZeros', () => {
  it('should correctly strip leading zeros - hex strings', () => {
    const testCases = [
      { value: '0x00009347', expected: '0x9347' },
      { value: '0x00185754', expected: '0x185754' },
      { value: '0x00000000005823', expected: '0x5823' },
    ];
    testCases.forEach((testCase) => {
      expect(hexStripZeros(testCase.value)).toBe(testCase.expected);
    });
  });
  it('should correctly strip leading zeros - byte arrays', () => {
    const testCases = [
      {
        value: new Uint8Array([0, 0, 0, 9, 58, 29, 24]),
        expected: '0x93a1d18',
      },
      { value: new Uint8Array([0, 185, 203]), expected: '0xb9cb' },
      {
        value: new Uint8Array([0, 0, 0, 0, 239, 30, 49, 41, 5, 10, 42]),
        expected: '0xef1e3129050a2a',
      },
    ];
    testCases.forEach((testCase) => {
      expect(hexStripZeros(testCase.value)).toBe(testCase.expected);
    });
  });
  it('should throw error - invalid hex strings', () => {
    const values = ['non-hex string'];
    values.forEach((value) => {
      expect(() => hexStripZeros(value)).toThrow('invalid hex string');
    });
  });
});
