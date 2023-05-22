import BN from 'bn.js';
import { tinyBig } from './tiny-big';

describe('tiny-big', () => {
  it('allows hex string input', () => {
    expect(tinyBig('0xa').toString()).toBe('10');
    expect(tinyBig('10').toString()).toBe('10');
  });
  it('performs toHexString properly', () => {
    expect(tinyBig(0).toHexString()).toBe('0x0');
    expect(tinyBig(1).toHexString()).toBe('0x1');
    expect(tinyBig(15).toHexString()).toBe('0xf');
    expect(tinyBig(16).toHexString()).toBe('0x10');
  });
  it('performs twosComplement', () => {
    const inputs = [
      { num: -3, bitCount: 3 },
      { num: 0, bitCount: 3 },
      { num: 3, bitCount: 3 },
    ];
    inputs.forEach(({ num, bitCount }) => {
      expect(tinyBig(num).toTwos(bitCount).toString()).toBe(
        new BN(num).toTwos(bitCount).toString(),
      );
    });
  });
});
