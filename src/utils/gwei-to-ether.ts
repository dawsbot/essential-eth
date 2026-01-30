import { validateType } from '../shared/validate-type';
import { formatFixed, toBigInt } from './fixed-point';

/**
 * Convert from Gwei to Ether
 *
 * No direct equivalent in ethers.js; requires multiple functions to achieve.
 *
 * No direct equivalent in web3; requires multiple functions to achieve.
 *
 * @param gweiQuantity the amount of gwei to convert to ether
 * @returns a string decimal representation of ether equivalent to the specified gwei
 * @example
 * ```javascript
 * gweiToEther('1000000000000')
 * // '1000'
 * gweiToEther(1000000000000)
 * // '1000'
 * ```
 */
export function gweiToEther(
  gweiQuantity: string | number | bigint,
): string {
  validateType(gweiQuantity, ['string', 'number', 'bigint']);
  return formatFixed(toBigInt(gweiQuantity), 9);
}
