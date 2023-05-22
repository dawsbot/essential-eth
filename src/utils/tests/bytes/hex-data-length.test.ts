import { hexDataLength } from '../../bytes';

describe('utils.hexDataLength', () => {
  it('should match expected value - hex values', () => {
    const testCases = [
      { value: '0x9347', expected: 2 },
      { value: '0x185754', expected: 3 },
      { value: '0x00005823', expected: 4 },
    ];
    testCases.forEach((testCase) => {
      expect(hexDataLength(testCase.value)).toStrictEqual(testCase.expected);
    });
  });

  it('should match expected value - UInt8Array values', () => {
    const testCases = [
      { value: new Uint8Array([9, 58, 29, 24]), expected: 4 },
      { value: new Uint8Array([185, 203]), expected: 2 },
      { value: new Uint8Array([239, 30, 49, 41, 5, 10, 42]), expected: 7 },
    ];
    testCases.forEach((testCase) => {
      expect(hexDataLength(testCase.value)).toStrictEqual(testCase.expected);
    });
  });

  it('should return null  - non-hex values or hex values not divisible by 2', () => {
    const values = ['0x383', 'non-hex string'];
    values.forEach((value) => {
      expect(hexDataLength(value)).toBeNull();
    });
  });
});
