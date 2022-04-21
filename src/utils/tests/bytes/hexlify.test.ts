import * as ethers from 'ethers';
import { hexlify } from '../../../';

describe('hexlify', () => {
  it('numbers - matches ethers strings', () => {
    const decimalValues = [0, 4, 5, 16];
    decimalValues.forEach((decimalValue) => {
      expect(hexlify(decimalValue)).toBe(ethers.utils.hexlify(decimalValue));
    });
  });
});
