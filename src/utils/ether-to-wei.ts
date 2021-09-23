import Big from 'big.js';
import { TinyBig, tinyBig } from '../shared/tiny-big/tiny-big';
import { validateType } from '../shared/validate-type';

/**
 * Similar to ["parseEther" in ethers.js](https://docs.ethers.io/v4/api-utils.html#ether-strings-and-wei)
 *
 * Similar to ["toWei" in web3](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html?highlight=towei#towei)
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
export function etherToWei(etherQuantity: string | number): TinyBig {
  validateType(etherQuantity, ['string', 'number']);
  const result = Big(etherQuantity).times('1000000000000000000').toString();
  return tinyBig(result);
}
