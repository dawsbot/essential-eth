import { formatFixed, toBigInt } from './fixed-point';

/**
 * Format a value in the smallest unit (e.g. wei) as a decimal string
 * with the given number of decimal places.
 *
 * Similar to ["formatUnits" in ethers.js](https://docs.ethers.io/v5/api/utils/display-logic/#utils-formatUnits)
 *
 * Similar to ["formatUnits" in viem](https://viem.sh/docs/utilities/formatUnits)
 *
 * @param value the value to format (in smallest unit)
 * @param decimals the number of decimal places (default 18)
 * @returns a decimal string representation
 * @example
 * ```javascript
 * formatUnits(1000000n, 6)
 * // '1'
 * ```
 * @example
 * ```javascript
 * formatUnits('1000000000000000000', 18)
 * // '1'
 * ```
 * @example
 * ```javascript
 * formatUnits(1500000n, 6)
 * // '1.5'
 * ```
 */
export function formatUnits(
  value: string | number | bigint,
  decimals: number = 18,
): string {
  return formatFixed(toBigInt(value), decimals);
}
