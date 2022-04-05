import Big from 'big.js';
import { TinyBig, tinyBig } from '../shared/tiny-big/tiny-big';
import { validateType } from '../shared/validate-type';

/**
 * Convert from Wei to Ether
 *
 * Similar to ["formatEther" in ethers.js](https://docs.ethers.io/v4/api-utils.html#ether-strings-and-wei)
 *
 * Similar to ["fromWei" in web3](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#fromwei)
 *
 * @example
 * ```javascript
 * weiToEther('1000000000000000000000').toString()
 * // '1000'
 * weiToEther(1000000000000000000000).toString()
 * // '1000'
 * ```
 *
 * @example
 * ```javascript
 * weiToEther('1000000000000000000000').toNumber()
 * // 1000
 * weiToEther(1000000000000000000000).toNumber()
 * // 1000
 * ```
 */
export function weiToEther(
  weiQuantity: string | number | TinyBig | Big,
): TinyBig {
  validateType(weiQuantity, ['string', 'number', 'object']);
  const result = tinyBig(weiQuantity).div('1000000000000000000');
  return tinyBig(result);
}
