import { isBytes, isBytesLike } from '../../..';

describe('isBytesLike', () => {
  it('matches expected', () => {
    const testCases = [
      { value: ['1', '2', '3'], isBytesLike: false, isBytes: false },
      { value: [1, 2, 3], isBytesLike: true, isBytes: true },
      { value: '0x123', isBytesLike: false, isBytes: false },
      { value: 123, isBytesLike: false, isBytes: false },
      { value: 0x123, isBytesLike: false, isBytes: false },
      { value: 'bad', isBytesLike: false, isBytes: false },
      { value: false, isBytesLike: false, isBytes: false },
      { value: { test: 'bad' }, isBytesLike: false, isBytes: false },
      { value: null, isBytesLike: false, isBytes: false },
      { value: new Uint8Array(), isBytesLike: true, isBytes: true },
      { value: new Uint8Array(1), isBytesLike: true, isBytes: true },
    ];

    testCases.forEach((testCase) => {
      expect(isBytesLike(testCase.value)).toBe(testCase.isBytesLike);
      expect(isBytes(testCase.value)).toBe(testCase.isBytes);
    });
  });
});
