import { validateType } from '../shared/validate-type';

/**
 * Returns a hex string padded to a specified length of bytes.
 *
 * Similar to ["hexZeroPad" in ethers.js](https://docs.ethers.io/v5/api/utils/bytes/#utils-hexZeroPad)
 *
 * Differs from ["padLeft" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#padleft) because web3 counts by characters, not bytes.
 *
 * @param hexValue - A hex-string, hex-number, or decimal number (auto-converts to base-16) to be padded
 * @param length - The final length in bytes
 *
 * @throws - If the value is not a hex string or number
 * @throws - If the value is longer than the length
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
 * hexZeroPad('12345', 1);
 * // Throws
 * ```
 */
export function hexZeroPad(hexValue: string | number, length: number): string {
  validateType(hexValue, ['string', 'number']);
  let val: string;
  if (typeof hexValue === 'string') {
    if (!hexValue.startsWith('0x'))
      throw new Error(
        `value is not a hex string or number. Consider prepending with "0x" (value="${hexValue}")`,
      );
    val = hexValue.substring(2);
  } else {
    val = hexValue.toString(16);
  }
  if (val.length > length * 2) {
    throw new Error(
      `value is longer than length (hexValue=${hexValue}, length=${length})`,
    );
  }
  return `0x${val.padStart(length * 2, '0')}`;
}
