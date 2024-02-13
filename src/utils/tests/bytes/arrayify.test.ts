import { arrayify, tinyBig } from '../../..';

describe('arrayify', () => {
  it('should correctly arrayify - values', () => {
    const testCases = [
      { input: 0, expected: new Uint8Array([0]) },
      { input: 1, expected: new Uint8Array([1]) },
      { input: '0x1234', expected: new Uint8Array([18, 52]) },
      { input: new Uint8Array(2), expected: new Uint8Array(2) },
      { input: tinyBig(17), expected: new Uint8Array([17]) },
    ];

    testCases.forEach((testCase) => {
      expect(arrayify(testCase.input)).toStrictEqual(testCase.expected);
    });
  });

  it('should correctly arrayify - values with options', () => {
    expect(arrayify('12', { allowMissingPrefix: true })).toStrictEqual(
      new Uint8Array([18]),
    );
    expect(arrayify('0x1', { hexPad: 'left' })).toStrictEqual(
      new Uint8Array([1]),
    );
    expect(arrayify('0x1', { hexPad: 'right' })).toStrictEqual(
      new Uint8Array([16]),
    );
  });

  it('should throw for invalid values', () => {
    expect(() => arrayify(tinyBig(15))).toThrow(); // hex data is odd-length
    expect(() => arrayify(false as any)).toThrow(); // invalid arrayify value
  });
});
