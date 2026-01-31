import { toUtf8String } from '../../index';

describe('toUtf8String', () => {
  it('decodes Uint8Array to string', () => {
    expect(toUtf8String(new Uint8Array([101, 116, 104]))).toBe('eth');
  });

  it('decodes hex string to string', () => {
    expect(toUtf8String('0x657468')).toBe('eth');
  });

  it('decodes essential-eth', () => {
    expect(toUtf8String('0x657373656e7469616c2d657468')).toBe('essential-eth');
  });

  it('handles empty input', () => {
    expect(toUtf8String(new Uint8Array([]))).toBe('');
  });
});
