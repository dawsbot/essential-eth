import { parseFixed } from './fixed-point';

/**
 * Parse a decimal string into the smallest unit (e.g. wei) as a bigint,
 * given the number of decimal places.
 *
 * Similar to ["parseUnits" in ethers.js](https://docs.ethers.io/v5/api/utils/display-logic/#utils-parseUnits)
 *
 * Similar to ["parseUnits" in viem](https://viem.sh/docs/utilities/parseUnits)
 *
 * @param value the decimal string to parse
 * @param decimals the number of decimal places (default 18)
 * @returns a bigint in the smallest unit
 * @example
 * ```javascript
 * parseUnits('1', 6)
 * // 1000000n
 * ```
 * @example
 * ```javascript
 * parseUnits('1.5', 6)
 * // 1500000n
 * ```
 * @example
 * ```javascript
 * parseUnits('1', 18)
 * // 1000000000000000000n
 * ```
 */
export function parseUnits(
  value: string,
  decimals: number = 18,
): bigint {
  return parseFixed(value, decimals);
}
