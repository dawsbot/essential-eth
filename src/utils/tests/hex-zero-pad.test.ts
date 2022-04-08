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
      }).toThrow(`Value passed in is not a hex string. String: "${value}"`);
    });
  });
  it('should return value passed in when value is longer than that padded string would be', () => {
    const values = ['0x5aAebAd', '0xfB691', '0xdbF036FB', '0xD1220ab'];
    values.forEach((value) => {
      expect(hexZeroPad(value, 2)).toStrictEqual(value);
    });
  });
  it('should match ethers.js and web3.js when padding can be applied', () => {
    // ether.js chooses to throw an error when the string is longer than the padded string would be
    const values = [
      '0x52908400098527886E0F7030069857D2E4169EE7',
      '0x8617E340B3D01FA5F11F306F4090FD50E238070D',
      '0xde709f2102306220921060314715629080e2fb77',
      '0x27b1fdb04752bbc536007a920d24acb045561c26',
      '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
      '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
      '0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
      '0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb',
    ];
    values.forEach((value) => {
      expect(hexZeroPad(value, 30)).toStrictEqual(
        ethers.utils.hexZeroPad(value, 30),
      );
    });
  });
});
