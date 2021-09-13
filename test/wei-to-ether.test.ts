import * as ethers from 'ethers';
import web3 from 'web3';
import { weiToEther } from './../src';

describe('wei-to-ether', () => {
  it('happy path', () => {
    expect(weiToEther('100000000000000000000.0').toString()).toStrictEqual(
      '100',
    );
    expect(weiToEther(100000000000000000000.0).toString()).toStrictEqual('100');
    expect(weiToEther('1000000000000000000000.0').toNumber()).toStrictEqual(
      1000,
    );
    expect(weiToEther(1000000000000000000000.0).toNumber()).toStrictEqual(1000);
  });

  describe('matches ethers and web3 toString', () => {
    it('toString', () => {
      expect(weiToEther('10').toString()).toStrictEqual(
        ethers.utils.formatEther('10'),
      );
      expect(weiToEther('1000000000000000000000').toString()).toStrictEqual(
        '1000',
        /* returns "1000.0" ethers.utils.formatEther("1000000000000000000000"), */
      );
      expect(weiToEther('10').toString()).toStrictEqual(
        web3.utils.fromWei('10', 'ether'),
      );
      expect(weiToEther('1000000000000000000000').toString()).toStrictEqual(
        web3.utils.fromWei('1000000000000000000000', 'ether'),
      );
    });

    it('toNumber', () => {
      /* easy */
      expect(weiToEther('9').toNumber()).toStrictEqual(
        Number(ethers.utils.formatEther('9')),
      );
      // expect(weiToEther("9").toNumber()).toStrictEqual(
      //   Number(ethers.utils.formatEther("9")),
      // );
      expect(weiToEther('9').toNumber()).toStrictEqual(
        Number(web3.utils.fromWei('9', 'ether')),
      );

      /* hard because they respond with scientific notation or overflowing */
      expect(weiToEther('999999').toNumber()).toStrictEqual(
        Number(
          ethers.utils.formatEther('999999'),
        ) /* overflow error if you use the ".toNumber()", */,
      );
      expect(weiToEther('999999').toNumber()).toStrictEqual(
        Number(web3.utils.fromWei('999999', 'ether')),
      );
    });
  });

  it('wrong types', () => {
    expect(() => {
      // @ts-expect-error should not accept boolean
      weiToEther(false);
    }).toThrow();
    expect(() => {
      // @ts-expect-error should not accept array
      weiToEther([1, 2, 3]);
    }).toThrow();
  });
});
