import { weiToEther } from '../../index';

describe('wei-to-ether', () => {
  it('happy path', () => {
    expect(weiToEther('1000000000000000000000')).toBe('1000');
    expect(weiToEther(1000000000000000000000n)).toBe('1000');
  });

  it('returns string', () => {
    expect(typeof weiToEther('1')).toBe('string');
  });

  it('matches expected value', () => {
    expect(weiToEther('10')).toBe('0.00000000000000001');
    expect(weiToEther('1000000000000000000000')).toBe('1000');
    expect(weiToEther('1500000000000000000')).toBe('1.5');
  });

  it('support hex', () => {
    expect(weiToEther('0x14')).toBe('0.00000000000000002');
    expect(weiToEther(0x14)).toBe('0.00000000000000002');
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
