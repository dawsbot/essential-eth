import Big from 'big.js';
import { tinyBig } from '../shared/tiny-big/tiny-big';
import { validateType } from '../shared/validate-type';
import { TinyBig } from './../shared/tiny-big/tiny-big';

/**
 * Convert from Ether to Wei
 *
 * Similar to ["formatEther" in ethers.js](https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatEther)
 *
 * Similar to ["fromWei" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#fromwei)
 *
 * @example
 * ```javascript
 * etherToWei('1000').toString()
 * // '1000000000000000000000'
 * etherToWei(1000).toString()
 * '1000000000000000000000'
 * ```
 *
 * @example
 * ```javascript
 * etherToWei('1000').toNumber()
 * // 1000000000000000000000
 * etherToWei(1000).toNumber()
 * // 1000000000000000000000
 * ```
 */
export function weiToEther(weiQuantity: string | number | TinyBig | Big) {
  validateType(weiQuantity, ['string', 'number', 'object']);
  const result = tinyBig(weiQuantity).div('1000000000000000000');
  return tinyBig(result);
}
