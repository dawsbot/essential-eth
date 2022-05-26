/**
 * Converts a hexadecimal string it's decimal equivalent.
 * This is needed instead of parseInt because parseInt loses precision
 *
 * @param hex
 * @example
 */
export function hexToDecimal(hex: string) {
  return BigInt(hex).toString();
}
