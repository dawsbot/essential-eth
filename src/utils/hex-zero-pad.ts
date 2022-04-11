/**
 * Returns a hex string padded to a specified length of bytes.
 * If the hex value provided is already longer than the padding value, the value itself is returned without alteration.
 *
 * Same as ["hexZeroPad" in ethers.js](https://docs.ethers.io/v5/api/utils/bytes/#utils-hexZeroPad)
 *
 * Differs from ["padLeft" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#padleft) because web3 counts by characters, not bytes.
 *
 * @param value - A hex-formatted string to be padded
 * @param length - The number of bytes to pad the value with
 *
 * @example
 * ```javascript
 * hexZeroPad('0x60', 2);
 * // '0x0060'
 * ```
 *
 * @example
 * ```javascript
 * hexZeroPad('0x657373656e7469616c657468', 5);
 * // '0x0000000000000000657373656e7469616c657468'
 * ```
 *
 * @example
 * ```javascript
 * // Length of string is already longer than padding value
 * hexZeroPad('0x31323334', 3);
 * // '0x31323334'
 */

export function hexZeroPad(value: string, length: number): string {
  value = String(value);
  if (!value.startsWith('0x'))
    throw new Error(`Value passed in is not a hex string. String: "${value}"`);
  return `0x${value.substring(2).padStart(length * 2, '0')}`;
}
