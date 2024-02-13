import { stripZeros } from '../../bytes';

describe('utils.stripZeros', () => {
  it('should match expected result - hex string', () => {
    const testCases = [
      { value: '0x00009347', expected: new Uint8Array([147, 71]) },
      { value: '0x00185754', expected: new Uint8Array([24, 87, 84]) },
      { value: '0x00000000005823', expected: new Uint8Array([88, 35]) },
    ];
    testCases.forEach((testCase) => {
      expect(stripZeros(testCase.value)).toStrictEqual(testCase.expected);
    });
  });
  it('should match expected result - UInt8Array', () => {
    const testCases = [
      {
        value: [0, 0, 0, 9, 58, 29, 24],
        expected: new Uint8Array([9, 58, 29, 24]),
      },
      { value: [0, 185, 203], expected: new Uint8Array([185, 203]) },
      {
        value: [0, 0, 0, 0, 239, 30, 49, 41, 5, 10, 42],
        expected: new Uint8Array([239, 30, 49, 41, 5, 10, 42]),
      },
    ];
    testCases.forEach((testCase) => {
      expect(stripZeros(testCase.value)).toStrictEqual(testCase.expected);
    });
  });
  it('should match expected result - empty array', () => {
    const testCases = [
      { value: [], expected: new Uint8Array([]) },
      { value: '0x', expected: new Uint8Array([]) },
    ];
    testCases.forEach((testCase) => {
      expect(stripZeros(testCase.value)).toStrictEqual(testCase.expected);
    });
  });
});
