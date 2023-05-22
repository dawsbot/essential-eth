import { hashMessage } from '../../index';

describe('utils.hashMessage', () => {
  it('should compute correct hash', () => {
    const testCases = [
      {
        message: '0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb',
        expectedHash: '0x053af31bc24e13e344973ab25910ff8da04a8acdd63a04187f84b7a340e9d663',
      },
      {
        message: '27b1fdb04752bbc536007a920d24acb045561c26', // leading "0x" is not required
        expectedHash: '0xd8141e0ec15afbf98a6f93d51e1b8bb8d988be77bca76a5692b73493d232f4f1',
      },
      {
        message: [1, 2],
        expectedHash: '0xd87309a295607439d67ad5243462242d36775fa665de60f4e26895808e01389b',
      },
      {
        message: [0x1, 0x2],
        expectedHash: '0xd87309a295607439d67ad5243462242d36775fa665de60f4e26895808e01389b',
      },
    ];

    testCases.forEach((testCase) => {
      expect(hashMessage(testCase.message)).toBe(testCase.expectedHash);
    });
  });
});