import { isHexString } from '../../bytes';

describe('utils.isHexString', () => {
  it('should return true - hex string', () => {
    const values = ['0x9347', '0x185754', '0x00005823'];
    values.forEach((value) => {
      expect(isHexString(value)).toBe(true);
    });
  });
  it('should match expected result- hex string of specific length', () => {
    const testCases = [
      { value: ['0x9347', 2], expected: true },
      // False because '0x185754' is 3 bytes long, not 5.
      { value: ['0x185754', 5], expected: false },
      { value: ['0x00005823', 4], expected: true },
    ] as const;
    testCases.forEach((testCase) => {
      expect(isHexString(testCase.value[0], testCase.value[1])).toBe(
        testCase.expected,
      );
    });
  });
  it('should return false - UInt8Array', () => {
    const values = [
      [9, 58, 29, 24],
      [185, 203],
      [239, 30, 49, 41, 5, 10, 42],
    ];
    values.forEach((value) => {
      expect(isHexString(value)).toBe(false);
    });
  });
  it('should return false - number', () => {
    const values = [152, 513, 2354];
    values.forEach((value) => {
      expect(isHexString(value)).toBe(false);
    });
  });
  it('should return false - non-hex string', () => {
    const values = ['essential-eth', 'ethers.js', '👋 firek.eth was here hehe'];
    values.forEach((value) => {
      expect(isHexString(value)).toBe(false);
    });
  });
  it('should return false - boolean', () => {
    const values = [false, true];
    values.forEach((value) => {
      expect(isHexString(value)).toBe(false);
    });
  });
});
