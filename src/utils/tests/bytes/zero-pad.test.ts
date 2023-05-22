import { zeroPad } from '../../bytes';

describe('utils.zeroPad', () => {
  it('should match expected result - hex string', () => {
    const testCases = [
      {
        value: ['0x9347', 10],
        expected: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 147, 71]),
      },
      { value: ['0x185754', 5], expected: new Uint8Array([0, 0, 24, 87, 84]) },
      {
        value: ['0x00005823', 7],
        expected: new Uint8Array([0, 0, 0, 0, 0, 88, 35]),
      },
    ] as const;
    testCases.forEach((testCase) => {
      expect(zeroPad(testCase.value[0], testCase.value[1])).toStrictEqual(
        testCase.expected,
      );
    });
  });
  it('should match expected result - UInt8Array', () => {
    const testCases = [
      {
        value: [[9, 58, 29, 24], 5],
        expected: new Uint8Array([0, 9, 58, 29, 24]),
      },
      { value: [[185, 203], 4], expected: new Uint8Array([0, 0, 185, 203]) },
      {
        value: [[239, 30, 49, 41, 5, 10, 42], 10],
        expected: new Uint8Array([0, 0, 0, 239, 30, 49, 41, 5, 10, 42]),
      },
    ] as const;
    testCases.forEach((testCase) => {
      expect(zeroPad(testCase.value[0], testCase.value[1])).toStrictEqual(
        testCase.expected,
      );
    });
  });
  it('should throw error - value out of range', () => {
    const values = [
      [[9, 58, 29, 24], 3],
      ['0x185754', 1],
    ] as const;
    values.forEach((value) => {
      expect(() => zeroPad(value[0], value[1])).toThrow('value out of range');
    });
  });
});
