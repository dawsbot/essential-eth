import { utils } from 'ethers';
import { hashMessage } from '../../index';

describe('utils.hashMessage', () => {
  it('should match ethers.js', () => {
    const messages = [
      '0x52908400098527886E0F7030069857D2E4169EE7',
      '0x8617E340B3D01FA5F11F306F4090FD50E238070D',
      '0xde709f2102306220921060314715629080e2fb77',
      '0x27b1fdb04752bbc536007a920d24acb045561c26',
      '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
      '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
      '0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
      '0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb',
      '27b1fdb04752bbc536007a920d24acb045561c26' /* leading "0x" is not required */,
    ];
    messages.forEach((message) => {
      expect(hashMessage(message)).toStrictEqual(utils.hashMessage(message));
      // expect(isAddress(address)).toStrictEqual(web3.utils.isAddress(address));
    });
  });
});
