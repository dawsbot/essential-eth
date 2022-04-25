import * as ethers from 'ethers';
import { arrayify, tinyBig } from '../../..';

describe('arrayify', () => {
  it('matches ethers', () => {
    const inputs = [0, 1, '0x1234', new Uint8Array(2), tinyBig(17)];

    inputs.forEach((input) => {
      //       console.log({ input, arr: arrayify(input as any) });
      expect(arrayify(input)).toStrictEqual(ethers.utils.arrayify(input));
    });
    expect(arrayify('12', { allowMissingPrefix: true })).toStrictEqual(
      ethers.utils.arrayify('12', { allowMissingPrefix: true }),
    );

    expect(arrayify('0x1', { hexPad: 'left' })).toStrictEqual(
      ethers.utils.arrayify('0x1', { hexPad: 'left' }),
    );
    expect(arrayify('0x1', { hexPad: 'right' })).toStrictEqual(
      ethers.utils.arrayify('0x1', { hexPad: 'right' }),
    );

    // hex data is odd length
    expect(() => arrayify(tinyBig(15))).toThrow();
    // invalid arrayify value
    expect(() => arrayify(false as any)).toThrow();
  });
});
