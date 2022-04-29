import { utils } from 'ethers';
import { toUtf8Bytes } from '../../index';

describe('utils.toUtf8Bytes', () => {
  it('should match ethers.js', () => {
    const inputs = ['0xa', '1', 'false'];
    inputs.forEach((input) => {
      expect(toUtf8Bytes(input)).toStrictEqual(utils.toUtf8Bytes(input));
    });
  });
});
