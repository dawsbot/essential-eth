import { etherToGwei } from '../../index';

describe('etherToGwei', () => {
  it('happy path', () => {
    expect(etherToGwei('100.0').toString()).toBe('100000000000');
    expect(etherToGwei(100).toString()).toBe('100000000000');
    expect(etherToGwei('0.000000001')).toBe(1n);
    expect(etherToGwei(1000n).toString()).toBe('1000000000000');
  });

  it('returns bigint', () => {
    expect(typeof etherToGwei('1')).toBe('bigint');
  });

  it('wrong types', () => {
    expect(() => {
      // @ts-expect-error should not accept boolean
      etherToGwei(false);
    }).toThrow();
    expect(() => {
      // @ts-expect-error should not accept array
      etherToGwei([1, 2, 3]);
    }).toThrow();
  });
});
