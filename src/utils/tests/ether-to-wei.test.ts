import { etherToWei } from '../../index';

describe('ether-to-wei', () => {
  it('happy path', () => {
    expect(etherToWei('100').toString()).toBe('100000000000000000000');
    expect(etherToWei(100).toString()).toBe('100000000000000000000');
    expect(etherToWei('1000.0').toString()).toBe('1000000000000000000000');
    expect(etherToWei(1000).toString()).toBe('1000000000000000000000');
    expect(etherToWei(1000n).toString()).toBe('1000000000000000000000');
  });

  it('matches expected toString', () => {
    expect(etherToWei('-09999.0').toString()).toBe('-9999000000000000000000');
  });

  it('handles decimal ether values', () => {
    expect(etherToWei('1.5').toString()).toBe('1500000000000000000');
    expect(etherToWei('0.1').toString()).toBe('100000000000000000');
  });

  it('returns bigint', () => {
    expect(typeof etherToWei('1')).toBe('bigint');
    expect(etherToWei('9')).toBe(9000000000000000000n);
  });

  it('should throw for wrong types', () => {
    expect(() => {
      // @ts-expect-error should not accept boolean
      etherToWei(false);
    }).toThrow();
    expect(() => {
      // @ts-expect-error should not accept array
      etherToWei([1, 2, 3]);
    }).toThrow();
  });
});
