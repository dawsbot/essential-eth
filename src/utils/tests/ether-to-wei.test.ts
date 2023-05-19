import Big from 'big.js';
import { etherToWei, tinyBig } from '../../index';

describe('ether-to-wei', () => {
  it('happy path', () => {
    expect(etherToWei('100').toString()).toBe('100000000000000000000');
    expect(etherToWei(100).toString()).toBe('100000000000000000000');
    expect(etherToWei('1000.0').toString()).toBe('1000000000000000000000');
    expect(etherToWei(1000).toString()).toBe('1000000000000000000000');
    expect(etherToWei('1000.0').toNumber()).toBe(1000000000000000000000);
    expect(etherToWei(tinyBig(1000)).toString()).toBe('1000000000000000000000');
    expect(etherToWei(tinyBig('1000.0')).toNumber()).toBe(
      1000000000000000000000,
    );
    expect(etherToWei(Big(1000)).toString()).toBe('1000000000000000000000');
    expect(etherToWei(Big('1000.0')).toNumber()).toBe(1000000000000000000000);
  });

  it('matches expected toString', () => {
    expect(etherToWei('-09999.0').toString()).toBe('-9999000000000000000000');
  });

  it('matches expected toNumber', () => {
    /* easy */
    expect(etherToWei('9').toNumber()).toBe(9000000000000000000);

    /* harder */
    expect(etherToWei('-0999999.90').toNumber()).toStrictEqual(-9.999999e23);
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
