import { validateType } from '../shared/validate-type';
import { formatFixed, toBigInt } from './fixed-point';

/**
 * Convert from Wei to Ether
 *
 * Similar to ["formatEther" in ethers.js](https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatEther)
 *
 * Similar to ["fromWei" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#fromwei)
 * @param weiQuantity the amount of wei to convert to ether
 * @returns a string decimal representation of ether equivalent to the specified wei
 * @example
 * ```javascript
 * weiToEther('1000000000000000000000')
 * // '1000'
 * weiToEther(1000000000000000000000)
 * // '1000'
 * ```
 */
export function weiToEther(weiQuantity: string | number | bigint): string {
  validateType(weiQuantity, ['string', 'number', 'bigint']);
  return formatFixed(toBigInt(weiQuantity), 18);
}
