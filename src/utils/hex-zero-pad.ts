/**
 * Returns a hex string padded to a specified length of bytes.
 * If the hex value provided is already longer than the desired length, an error will be thrown.
 *
 * Similar to ["hexZeroPad" in ethers.js](https://docs.ethers.io/v5/api/utils/bytes/#utils-hexZeroPad)
 *
 * Differs from ["padLeft" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#padleft) because web3 counts by characters, not bytes.
 *
 * @param value - A hex-formatted string, hex-formatted number, or decimal number (converted to hex) to be padded
 * @param length - The desired hex length of the value
 *
 * @example
 * ```javascript
 * hexZeroPad('0x60', 2);
 * // '0x0060'
 * ```
 *
 * @example
 * ```javascript
 * hexZeroPad(0x60, 3);
 * // '0x000060'
 * ```
 *
 * @example
 * ```javascript
 * hexZeroPad(112, 3);
 * // '0x000112'
 */

import { validateType } from '../shared/validate-type';

export function hexZeroPad(value: string | number, length: number): string {
  validateType(value, ['string', 'number']);
  let val: string;
  if (typeof value === 'string') {
    if (!value.startsWith('0x'))
      throw new Error(
        `value is not a hex string or number. Consider prepending with "0x" (value="${value}")`,
      );
    val = value.substring(2);
  } else {
    val = value.toString(16);
  }
  if (val.length > length * 2) {
    throw new Error(
      `value is longer than length (value=${value}, length=${length})`,
    );
  }
  return `0x${val.padStart(length * 2, '0')}`;
}
