import { parseUnits } from '../../index';

describe('parseUnits', () => {
  it('parses ether (18 decimals)', () => {
    expect(parseUnits('1', 18)).toBe(1000000000000000000n);
    expect(parseUnits('1.5', 18)).toBe(1500000000000000000n);
    expect(parseUnits('0', 18)).toBe(0n);
  });

  it('parses USDC (6 decimals)', () => {
    expect(parseUnits('1', 6)).toBe(1000000n);
    expect(parseUnits('1.5', 6)).toBe(1500000n);
    expect(parseUnits('0.000001', 6)).toBe(1n);
  });

  it('parses WBTC (8 decimals)', () => {
    expect(parseUnits('1', 8)).toBe(100000000n);
    expect(parseUnits('0.5', 8)).toBe(50000000n);
  });

  it('defaults to 18 decimals', () => {
    expect(parseUnits('1')).toBe(1000000000000000000n);
  });

  it('handles negative values', () => {
    expect(parseUnits('-1', 6)).toBe(-1000000n);
  });
});
