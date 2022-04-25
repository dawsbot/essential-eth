import * as ethers from 'ethers';
import { hexlify } from '../../../';

describe('hexlify', () => {
  it('numbers - matches ethers strings', () => {
    const decimalValues = [0, 4, 5, 16, BigInt(0), BigInt(16)];
    decimalValues.forEach((decimalValue) => {
      expect(hexlify(decimalValue)).toBe(ethers.utils.hexlify(decimalValue));
    });

    const opts = { allowMissingPrefix: true };
    expect(hexlify('22', opts)).toBe(ethers.utils.hexlify('22', opts));
  });
});
