import Big from 'big.js';
import { gweiToEther, tinyBig } from '../../index';

describe('gweiToEther', () => {
  it('happy path', () => {
    expect(gweiToEther('100000000000.0').toString()).toBe('100');
    expect(gweiToEther(100000000000.0).toString()).toBe('100');
    expect(gweiToEther('1000000000000.0').toNumber()).toBe(1000);
    expect(gweiToEther(1000000000000.0).toNumber()).toBe(1000);

    expect(gweiToEther(tinyBig('1000000000000.0')).toNumber()).toBe(1000);
    expect(gweiToEther(tinyBig(1000000000000.0)).toNumber()).toBe(1000);
    expect(gweiToEther(Big('1000000000000.0')).toNumber()).toBe(1000);
    expect(gweiToEther(Big(1000000000000.0)).toNumber()).toBe(1000);
  });

  it('wrong types', () => {
    expect(() => {
      // @ts-expect-error should not accept boolean
      gweiToEther(false);
    }).toThrow();
    expect(() => {
      // @ts-expect-error should not accept array
      gweiToEther([1, 2, 3]);
    }).toThrow();
  });
});
