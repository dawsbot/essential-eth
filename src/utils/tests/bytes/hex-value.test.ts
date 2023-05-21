import { hexValue } from '../../bytes';
import { tinyBig } from './../../../shared/tiny-big/tiny-big';

describe('utils.hexValue', () => {
  it('should correctly convert - hex string', () => {
    const testCases = [
      { value: '0x9347', expected: '0x9347' },
      { value: '0x185754', expected: '0x185754' },
      { value: '0x00005823', expected: '0x5823' },
    ];
    testCases.forEach((testCase) => {
      expect(hexValue(testCase.value)).toStrictEqual(testCase.expected);
    });
  });
  it('should correctly convert - byte array', () => {
    const testCases = [
      { value: [4, 50, 2], expected: '0x43202' },
      { value: [231, 49, 40, 70, 19], expected: '0xe731284613' },
      { value: [10, 68, 20, 98], expected: '0xa441462' },
    ];
    testCases.forEach((testCase) => {
      expect(hexValue(testCase.value)).toStrictEqual(testCase.expected);
    });
  });
  it('should correctly convert - TinyBig instance', () => {
    const testCases = [
      { value: tinyBig('29389'), expected: '0x72cd' },
      { value: tinyBig(2834), expected: '0xb12' },
      { value: tinyBig(402), expected: '0x192' },
    ];
    testCases.forEach((testCase) => {
      expect(hexValue(testCase.value)).toStrictEqual(testCase.expected);
    });
  });
  it('should correctly convert - number', () => {
    const testCases = [
      { value: 624, expected: '0x270' },
      { value: 457, expected: '0x1c9' },
      { value: 23451, expected: '0x5b9b' },
    ];
    testCases.forEach((testCase) => {
      expect(hexValue(testCase.value)).toStrictEqual(testCase.expected);
    });
  });
  it('should correctly convert - BigInt', () => {
    const testCases = [
      { value: BigInt(204), expected: '0xcc' },
      { value: BigInt('23491'), expected: '0x5bc3' },
      { value: BigInt(4183459235723491), expected: '0xedcd581ad78e3' },
    ];
    testCases.forEach((testCase) => {
      expect(hexValue(testCase.value)).toStrictEqual(testCase.expected);
    });
  });
  it('should return 0x0 - only zero data given', () => {
    const testCases = [
      { value: BigInt(0), expected: '0x0' },
      { value: 0, expected: '0x0' },
      { value: '0x0000', expected: '0x0' },
      { value: [0, 0, 0], expected: '0x0' },
    ];
    testCases.forEach((testCase) => {
      expect(hexValue(testCase.value)).toStrictEqual(testCase.expected);
    });
  });
});
