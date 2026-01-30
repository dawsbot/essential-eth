import { validateType } from '../shared/validate-type';
import { parseFixed } from './fixed-point';

/**
 * Convert from Ether to Gwei
 *
 * No direct equivalent in ether.js; requires multiple functions to achieve.
 *
 * No direct equivalent in web3; requires multiple functions to achieve.
 *
 * @param etherQuantity the amount of ether to convert to gwei
 * @returns a bigint of gwei equivalent to the specified ether
 * @example
 * ```javascript
 * etherToGwei('1000').toString()
 * // '1000000000000'
 * etherToGwei(1000).toString()
 * // '1000000000000'
 * ```
 */
export function etherToGwei(
  etherQuantity: string | number | bigint,
): bigint {
  validateType(etherQuantity, ['string', 'number', 'bigint']);
  return parseFixed(String(etherQuantity), 9);
}
