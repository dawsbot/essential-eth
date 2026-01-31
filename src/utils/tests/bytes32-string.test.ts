import { decodeBytes32String, encodeBytes32String } from '../../index';

describe('encodeBytes32String', () => {
  it('encodes a short string', () => {
    const encoded = encodeBytes32String('essential-eth');
    expect(encoded).toBe(
      '0x657373656e7469616c2d65746800000000000000000000000000000000000000',
    );
  });

  it('encodes empty string', () => {
    const encoded = encodeBytes32String('');
    expect(encoded.length).toBe(66); // 0x + 64 hex chars
    expect(encoded).toMatch(/^0x0+$/);
  });

  it('throws for string > 31 bytes', () => {
    expect(() =>
      encodeBytes32String('this string is definitely longer than 31 bytes'),
    ).toThrow();
  });
});

describe('decodeBytes32String', () => {
  it('decodes a bytes32 value', () => {
    expect(
      decodeBytes32String(
        '0x657373656e7469616c2d65746800000000000000000000000000000000000000',
      ),
    ).toBe('essential-eth');
  });

  it('decodes empty bytes32', () => {
    expect(decodeBytes32String('0x' + '00'.repeat(32))).toBe('');
  });

  it('roundtrips', () => {
    const original = 'hello';
    expect(decodeBytes32String(encodeBytes32String(original))).toBe(original);
  });
});
