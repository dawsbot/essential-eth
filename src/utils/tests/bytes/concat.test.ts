import * as ethers from 'ethers';
import type { BytesLikeWithNumber} from '../../..';
import { concat } from '../../..';

describe('concat', () => {
  it('matches ethers', () => {
    const inputs: ReadonlyArray<BytesLikeWithNumber[]> = [[0, 1]];

    inputs.forEach((input) => {
      expect(concat(input)).toStrictEqual(ethers.utils.concat(input as any));
    });
  });
});
