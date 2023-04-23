/**
 * Converts a hexadecimal string it's decimal equivalent.
 * This is needed instead of parseInt because parseInt loses precision.
 * @param hex the hex string to be converted to decimal
 * @returns a decimal value equivalent to the hex string given
 * @example
 * ```javascript
 * hexToDecimal('0x34');
 * // 52
 * ```
 * @example
 * ```javascript
 * hexToDecimal('0x628608');
 * // 6456840
 * ```
 */
export function hexToDecimal(hex: string) {
  return BigInt(hex).toString();
}
