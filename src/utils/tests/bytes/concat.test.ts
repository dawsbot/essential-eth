import * as ethers from 'ethers';
import { BytesLike, concat } from '../../..';

describe('concat', () => {
  it('matches ethers', () => {
    const inputs: ReadonlyArray<BytesLike[]> = [[0, 1]];

    inputs.forEach((input) => {
      expect(concat(input)).toStrictEqual(ethers.utils.concat(input as any));
    });
  });
});
