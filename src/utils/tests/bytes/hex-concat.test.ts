import { hexConcat } from '../../bytes';

describe('utils.hexConcat', () => {
  it('should correctly concatenate - hex values', () => {
    const values = ['0x2048', '0x6917', '0x85616379'];
    const expected = '0x2048691785616379';
    expect(hexConcat(values)).toBe(expected);
  });
  it('should correctly concatenate - UInt8Array values', () => {
    const values = [
      new Uint8Array([5, 10, 247, 22]),
      new Uint8Array([50, 255, 3]),
      new Uint8Array([59, 36, 18, 46, 198, 234]),
    ];
    const expected = '0x050af71632ff033b24122ec6ea';
    expect(hexConcat(values)).toStrictEqual(expected);
  });
  it('should correctly concatenate - hex & UInt8Array values', () => {
    const values = [
      '0x2048',
      [5, 10, 247, 22],
      '0x6917',
      [50, 255, 3],
      '0x85616379',
      [59, 36, 18, 46, 198, 234],
    ];
    const expected = '0x2048050af716691732ff03856163793b24122ec6ea';
    expect(hexConcat(values)).toStrictEqual(expected);
  });
});
