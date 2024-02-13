import { hexZeroPad } from '../../../';

describe('hexZeroPad', () => {
  it('should correctly pad - numbers', () => {
    const testCases = [
      { value: 123, expected: '0x000000000000000000000000000000000000007b' },
      { value: 0, expected: '0x0000000000000000000000000000000000000000' },
    ];
    testCases.forEach((testCase) => {
      expect(hexZeroPad(testCase.value, 20)).toStrictEqual(testCase.expected);
    });
  });
  it('should correctly pad - arrays of numbers', () => {
    const testCases = [
      { value: [1, 2, 3, 4], expected: '0x000000000000000000000001020304' },
    ];
    testCases.forEach((testCase) => {
      expect(hexZeroPad(testCase.value, 15)).toStrictEqual(testCase.expected);
    });
  });
  it('should throw error - non-hex string', () => {
    const value = '52908';
    expect(() => {
      hexZeroPad(value, 23);
    }).toThrow();
  });
  it('should throw error - values longer than desired length', () => {
    const hexValues = [0x123456, '0x5aAebAd', '0xfB691', '0xD1220ab'];
    hexValues.forEach((hexValue) => {
      expect(() => hexZeroPad(hexValue, 2)).toThrow();
    });
  });
  it('should correctly pad - valid hex values', () => {
    const testCases = [
      { value: 10, expected: '0x00000000000000000000000000000a' },
      { value: '0x5290', expected: '0x000000000000000000000000005290' },
      { value: '0x8617E3', expected: '0x0000000000000000000000008617E3' },
      { value: '0xde709f210', expected: '0x000000000000000000000de709f210' },
      { value: '0x27b', expected: '0x00000000000000000000000000027b' },
      { value: 0x0, expected: '0x000000000000000000000000000000' },
      { value: 0x5aaeb605, expected: '0x00000000000000000000005aaeb605' },
      {
        value: '0xfB6916095ca1df',
        expected: '0x0000000000000000fB6916095ca1df',
      },
      {
        value: '0xdbF03B407c01E7cD3CBea99509d93',
        expected: '0x0dbF03B407c01E7cD3CBea99509d93',
      },
      { value: 0xd1220a0cf4, expected: '0x00000000000000000000d1220a0cf4' },
    ];
    testCases.forEach((testCase) => {
      expect(hexZeroPad(testCase.value, 15)).toStrictEqual(testCase.expected);
    });
  });
});
