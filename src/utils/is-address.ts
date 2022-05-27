import { toChecksumAddress } from '..';
import { validateType } from '../shared/validate-type';

/**
 * Returns a boolean as to whether the input is a valid address.
 * Does NOT support ICAP addresses
 *
 * @param address the address to check the validity of
 * @returns a boolean for whether the input is a valid address
 * @example
 * ```javascript
 * isAddress('0xc0deaf6bd3f0c6574a6a625ef2f22f62a5150eab');
 * // true
 * ```
 * @example
 * ```javascript
 * isAddress('bad');
 * // false
 * ```
 * @example
 * ```javascript
 * // Does NOT support ENS.
 * isAddress('vitalik.eth');
 * // false
 * ```
 */
export function isAddress(address: string): boolean {
  validateType(address, ['string']);
  try {
    toChecksumAddress(address);
    return true;
  } catch (error) {
    return false;
  }
}
