import { gweiToEther } from '../../index';

describe('gweiToEther', () => {
  it('happy path', () => {
    expect(gweiToEther('100000000000')).toBe('100');
    expect(gweiToEther(100000000000)).toBe('100');
    expect(gweiToEther('1000000000000')).toBe('1000');
    expect(gweiToEther(1000000000000)).toBe('1000');
    expect(gweiToEther(1000000000000n)).toBe('1000');
  });

  it('returns string', () => {
    expect(typeof gweiToEther('1')).toBe('string');
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
