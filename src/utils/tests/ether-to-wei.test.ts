import Big from 'big.js';
import * as ethers from 'ethers';
import web3 from 'web3';
import { etherToWei, tinyBig } from '../../index';
import { scientificStrToDecimalStr } from '../../shared/tiny-big/helpers';

describe('ether-to-wei', () => {
  it('happy path', () => {
    expect(etherToWei('100').toString()).toStrictEqual('100000000000000000000');
    expect(etherToWei(100).toString()).toStrictEqual('100000000000000000000');
    expect(etherToWei('1000.0').toString()).toStrictEqual(
      '1000000000000000000000',
    );
    expect(etherToWei(1000).toString()).toStrictEqual('1000000000000000000000');
    expect(etherToWei('1000.0').toNumber()).toStrictEqual(
      1000000000000000000000,
    );
    expect(etherToWei(tinyBig(1000)).toString()).toStrictEqual(
      '1000000000000000000000',
    );
    expect(etherToWei(tinyBig('1000.0')).toNumber()).toStrictEqual(
      1000000000000000000000,
    );
    expect(etherToWei(Big(1000)).toString()).toStrictEqual(
      '1000000000000000000000',
    );
    expect(etherToWei(Big('1000.0')).toNumber()).toStrictEqual(
      1000000000000000000000,
    );
  });

  it('matches ethers and web3 toString', () => {
    expect(etherToWei('-09999.0').toString()).toStrictEqual(
      ethers.utils.parseEther('-09999.0').toString(),
    );
    expect(etherToWei('-09999.0').toString()).toStrictEqual(
      web3.utils.toWei('-09999.0', 'ether'),
    );
  });

  it('matches ethers and web3 toNumber', () => {
    /* easy */
    expect(etherToWei('9').toNumber()).toStrictEqual(
      Number(ethers.utils.parseEther('9')),
    );
    // web3 responds with scientific notation
    expect(etherToWei('9').toNumber()).toStrictEqual(
      Number(web3.utils.toWei('9', 'ether')),
    );

    /* harder */
    expect(etherToWei('-0999999.90').toNumber()).toStrictEqual(
      Number(
        ethers.utils.parseEther('-0999999.90'),
      ) /* overflow error if you use the ".toNumber()", */,
    );
    // web3 responds with scientific notation
    expect(etherToWei('-0999999.9').toNumber()).toStrictEqual(
      Number(
        scientificStrToDecimalStr(web3.utils.toWei('-0999999.9', 'ether')),
      ),
    );
  });

  it('wrong types', () => {
    expect(() => {
      // @ts-expect-error should not accept boolean
      etherToWei(false);
    }).toThrow();
    expect(() => {
      // @ts-expect-error should not accept array
      etherToWei([1, 2, 3]);
    }).toThrow();
  });
});
