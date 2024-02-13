import { toUtf8Bytes } from '../../index';

describe('utils.toUtf8Bytes', () => {
  it('should correctly convert to UTF8 bytes', () => {
    const testCases = [
      { input: '0xa', expected: new Uint8Array([48, 120, 97]) },
      { input: '1', expected: new Uint8Array([49]) },
      { input: 'false', expected: new Uint8Array([102, 97, 108, 115, 101]) },
    ];

    testCases.forEach((testCase) => {
      expect(toUtf8Bytes(testCase.input)).toStrictEqual(testCase.expected);
    });
  });
});
