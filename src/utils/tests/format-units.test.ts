import { formatUnits } from '../../index';

describe('formatUnits', () => {
  it('formats wei to ether (18 decimals)', () => {
    expect(formatUnits(1000000000000000000n, 18)).toBe('1');
    expect(formatUnits('1500000000000000000', 18)).toBe('1.5');
    expect(formatUnits(0n, 18)).toBe('0');
  });

  it('formats USDC (6 decimals)', () => {
    expect(formatUnits(1000000n, 6)).toBe('1');
    expect(formatUnits(1500000n, 6)).toBe('1.5');
    expect(formatUnits(100n, 6)).toBe('0.0001');
  });

  it('formats WBTC (8 decimals)', () => {
    expect(formatUnits(100000000n, 8)).toBe('1');
    expect(formatUnits(50000000n, 8)).toBe('0.5');
  });

  it('defaults to 18 decimals', () => {
    expect(formatUnits(1000000000000000000n)).toBe('1');
  });
});
