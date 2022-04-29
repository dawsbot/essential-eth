import { utils } from 'ethers';
import Web3 from 'web3';
import { verifyMessage } from '../../index';

describe('verifyMessage', () => {
  const inputs = [];
  it('should match ethers.js', () => {
    inputs.forEach((input) => {
      expect(verifyMessage(input.message, input.signature)).toStrictEqual(
        utils.verifyMessage(input.message, input.signature),
      );
    });
  });
  it('should match web3.js', () => {
    const web3 = new Web3();
    inputs.forEach((input) => {
      expect(verifyMessage(input.message, input.signature)).toStrictEqual(
        web3.eth.accounts.recover(input.message, input.signature),
      );
    });
  });
});
