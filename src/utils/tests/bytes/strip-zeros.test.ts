import { stripZeros } from '../../bytes';

describe('utils.stripZeros', () => {
  it('hex strings', () => {
    const value = '0x00009347';
    const stripped = stripZeros(value);
    expect(stripped).toStrictEqual(new Uint8Array([147, 71]));
  });
  it('array of integer numbers', () => {
    const value = [0, 0, 0, 9, 58, 29, 24, 0];
    expect(stripZeros(value)).toStrictEqual(new Uint8Array([9, 58, 29, 24, 0]));
  });
  it('array of empty array and hex string', () => {
    const values = [[], '0x'];
    values.forEach((value) => {
      expect(stripZeros(value)).toStrictEqual(new Uint8Array([]));
    });
  });
});
