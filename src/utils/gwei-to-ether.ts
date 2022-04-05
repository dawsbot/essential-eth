import Big from 'big.js';
import { tinyBig } from '../shared/tiny-big/tiny-big';
import { validateType } from '../shared/validate-type';
import { TinyBig } from './../shared/tiny-big/tiny-big';

/**
 * Convert from Gwei to Ether
 *
 * No direct equivalent in ethers.js; requires multiple functions to achieve.
 *
 * No direct equivalent in web3; requires multiple functions to achieve.
 *
 * @example
 * ```javascript
 * gweiToEther('1000000000000').toString()
 * // '1000'
 * gweiToEther(1000000000000).toString()
 * '1000'
 * ```
 *
 * @example
 * ```javascript
 * gweiToEther('1000000000000').toNumber()
 * // 1000
 * gweiToEther(1000000000000).toNumber()
 * // 1000
 * ```
 */
export function gweiToEther(
  weiQuantity: string | number | TinyBig | Big,
): TinyBig {
  validateType(weiQuantity, ['string', 'number', 'object']);
  const result = tinyBig(weiQuantity).div('1000000000');
  return tinyBig(result);
}
