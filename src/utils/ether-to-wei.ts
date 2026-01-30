import { validateType } from '../shared/validate-type';
import { parseFixed } from './fixed-point';

/**
 * Convert Ether to Wei
 *
 * Similar to ["parseEther" in ethers.js](https://docs.ethers.io/v5/api/utils/display-logic/#utils-parseEther)
 *
 * Similar to ["toWei" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#towei)
 *
 * @param etherQuantity the amount of ether to convert to wei
 * @returns a bigint of wei equivalent to the specified ether
 * @example
 * ```javascript
 * etherToWei('1000').toString()
 * // '1000000000000000000000'
 * etherToWei(1000).toString()
 * // '1000000000000000000000'
 * ```
 */
export function etherToWei(
  etherQuantity: string | number | bigint,
): bigint {
  validateType(etherQuantity, ['string', 'number', 'bigint']);
  return parseFixed(String(etherQuantity), 18);
}
