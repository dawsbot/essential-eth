import * as ethers from 'ethers';
import { hexZeroPad } from '../../index';

describe('hex-zero-pad', () => {
  it('should reject strings passed in which are not hex strings', () => {
    const values = [
      '52908400098527886E0F7030069857D2E4169EE7',
      '8617E340B3D01FA5F11F306F4090FD50E238070D',
      'de709f2102306220921060314715629080e2fb77',
      '27b1fdb04752bbc536007a920d24acb045561c26',
    ];
    values.forEach((value) => {
      expect(() => {
        hexZeroPad(value, 23);
      }).toThrow(
        `Value passed in is not a hex string or number. Value: "${value}"`,
      );
    });
  });
  it('should throw error when value is already longer than desired length', () => {
    const values = [
      0x123456,
      '0x5aAebAd',
      '0xfB691',
      '0xdbF036FB',
      '0xD1220ab',
    ];
    values.forEach((value) => {
      expect(() => hexZeroPad(value, 2)).toThrow(
        `Value passed in is already longer than the requested length.`,
      );
    });
  });
  it('should match ethers.js when padding can be applied', () => {
    const values = [
      '0x5290',
      '0x8617E3',
      '0xde709f210',
      '0x27b',
      0x5aaeb605,
      '0xfB6916095ca1df',
      '0xdbF03B407c01E7cD3CBea99509d93',
      0xd1220a0cf4,
    ];
    values.forEach((value) => {
      expect(hexZeroPad(value, 30)).toStrictEqual(
        ethers.utils.hexZeroPad(value as any, 30),
      );
    });
  });
});
