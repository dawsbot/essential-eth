import Big from 'big.js';
import { tinyBig } from './shared/tiny-big/tiny-big';
import { validateType } from './shared/validate-type';

/**
 * Convert from Ether to Wei
 *
 * Similar to ["formatEther" in ethers.js](https://docs.ethers.io/v4/api-utils.html#ether-strings-and-wei)
 *
 * Similar to ["fromWei" in web3](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#fromwei)
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
export function weiToEther(weiQuantity: string | number) {
  validateType(weiQuantity, ['string', 'number']);
  const result = Big(weiQuantity).div('1000000000000000000').toString();
  return tinyBig(result);
}
