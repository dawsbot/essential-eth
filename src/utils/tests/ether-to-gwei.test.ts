import Big from 'big.js';
import { etherToGwei, tinyBig } from '../../index';

describe('gweiToEther', () => {
  it('happy path', () => {
    expect(etherToGwei('100.0').toString()).toBe('100000000000');
    expect(etherToGwei(100.0).toString()).toBe('100000000000');
    expect(etherToGwei('0.000000001').toNumber()).toBe(1);
    expect(etherToGwei(0.000000001).toNumber()).toBe(1);

    expect(etherToGwei(tinyBig(1000)).toNumber()).toBe(1000000000000);
    expect(etherToGwei(Big(0.000000001)).toNumber()).toBe(1);
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
