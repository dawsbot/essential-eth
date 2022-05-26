import Big from 'big.js';
import { TinyBig, tinyBig } from '../shared/tiny-big/tiny-big';
import { validateType } from '../shared/validate-type';

/**
 * Convert from Wei to Ether
 *
 * Similar to ["formatEther" in ethers.js](https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatEther)
 *
 * Similar to ["fromWei" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#fromwei)
 *
 * @param weiQuantity
 * @example
 * ```javascript
 * weiToEther('1000000000000000000000').toString()
 * // '1000'
 * weiToEther(1000000000000000000000).toString()
 * // '1000'
 * ```
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
  // eslint-disable-next-line no-useless-catch
  try {
    let _weiQuantity = weiQuantity;
    if (typeof weiQuantity === 'string' && weiQuantity.slice(0, 2) === '0x') {
      _weiQuantity = BigInt(weiQuantity).toString();
    }
    const result = tinyBig(_weiQuantity).div('1000000000000000000');
    return tinyBig(result);
  } catch (error) {
    throw error;
  }
}
