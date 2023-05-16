import Big from 'big.js';
import { tinyBig, weiToEther } from '../../index';

describe('wei-to-ether', () => {
  it('happy path', () => {
    expect(weiToEther('100000000000000000000.0').toString()).toBe('100');
    expect(weiToEther(100000000000000000000.0).toString()).toBe('100');
    expect(weiToEther('1000000000000000000000.0').toNumber()).toBe(1000);
    expect(weiToEther(1000000000000000000000.0).toNumber()).toBe(1000);
    expect(weiToEther(tinyBig('1000000000000000000000.0')).toNumber()).toBe(1000);
    expect(weiToEther(tinyBig(1000000000000000000000.0)).toNumber()).toBe(1000);
    expect(weiToEther(Big('1000000000000000000000.0')).toNumber()).toBe(1000);
    expect(weiToEther(Big(1000000000000000000000.0)).toNumber()).toBe(1000);
  });

  it('matches expected value toString', () => {
    expect(weiToEther('10').toString()).toStrictEqual('0.00000000000000001');
    expect(weiToEther('1000000000000000000000').toString()).toBe('1000');
  });

  it('matches expected value toNumber', () => {
    /* easy */
    expect(weiToEther('9').toNumber()).toStrictEqual(9e-18);
    expect(weiToEther("9").toNumber()).toStrictEqual(9e-18);

    /* harder */
    expect(weiToEther('999999').toNumber()).toStrictEqual(9.99999e-13);
  });

  it('support hex', () => {
    expect(weiToEther('0x14').toString()).toStrictEqual('0.00000000000000002');
    expect(weiToEther(0x14).toString()).toStrictEqual('0.00000000000000002');
  });

  it('wrong types', () => {
    expect(() => {
      // @ts-expect-error should not accept boolean
      weiToEther(false);
    }).toThrow();
    expect(() => {
      // @ts-expect-error should not accept array
      weiToEther([1, 2, 3]);
    }).toThrow();
  });
});
