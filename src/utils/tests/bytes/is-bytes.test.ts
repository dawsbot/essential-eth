import * as ethers from 'ethers';
import { isBytes, isBytesLike } from '../../..';

describe('isBytesLike', () => {
  it('matches ethers', () => {
    const inputs = [
      ['1', '2', '3'],
      [1, 2, 3],
      '0x123',
      123,
      0x123,
      'bad',
      false,
      { test: 'bad' },
      null,
      new Uint8Array(),
      new Uint8Array(1),
    ];

    inputs.forEach((input) => {
      expect(isBytesLike(input)).toBe(ethers.utils.isBytesLike(input));
      expect(isBytes(input)).toBe(ethers.utils.isBytes(input));
    });
  });
});
