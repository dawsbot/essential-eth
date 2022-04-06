import Big from 'big.js';
import { TinyBig, tinyBig } from '../shared/tiny-big/tiny-big';
import { validateType } from '../shared/validate-type';

/**
 * Convert Ether to Wei
 *
 * Similar to ["parseEther" in ethers.js](https://docs.ethers.io/v5/api/utils/display-logic/#utils-parseEther)
 *
 * Similar to ["toWei" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#towei)
 *
 * @example
 * ```javascript
 * etherToWei('1000').toString()
 * // '1000000000000000000000'
 * etherToWei(1000).toString()
 * // '1000000000000000000000'
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
export function etherToWei(
  etherQuantity: string | number | TinyBig | Big,
): TinyBig {
  validateType(etherQuantity, ['string', 'number', 'object']);
  const result = tinyBig(etherQuantity).times('1000000000000000000');
  return tinyBig(result);
}
