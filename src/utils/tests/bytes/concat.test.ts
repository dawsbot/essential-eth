import type { BytesLikeWithNumber } from '../../..';
import { concat } from '../../..';

describe('concat', () => {
  it('matches expected result', () => {
    const inputs: ReadonlyArray<BytesLikeWithNumber[]> = [[0, 1]];

    inputs.forEach((input) => {
      expect(concat(input)).toStrictEqual(new Uint8Array([0, 1]));
    });
  });
});
