import { id } from '../../index';

describe('id', () => {
  it('computes ERC-20 Transfer event topic', () => {
    expect(id('Transfer(address,address,uint256)')).toBe(
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    );
  });

  it('computes Approval event topic', () => {
    expect(id('Approval(address,address,uint256)')).toBe(
      '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
    );
  });

  it('computes balanceOf function selector (first 4 bytes)', () => {
    expect(id('balanceOf(address)').slice(0, 10)).toBe('0x70a08231');
  });

  it('computes transfer function selector', () => {
    expect(id('transfer(address,uint256)').slice(0, 10)).toBe('0xa9059cbb');
  });
});
