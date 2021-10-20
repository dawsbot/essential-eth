import { tinyBig } from './tiny-big';

describe('tiny-big', () => {
  it('performs toHexString properly', () => {
    expect(tinyBig(0).toHexString()).toBe('0x0');
    expect(tinyBig(1).toHexString()).toBe('0x1');
    expect(tinyBig(15).toHexString()).toBe('0xf');
    expect(tinyBig(16).toHexString()).toBe('0x10');
  });
});
