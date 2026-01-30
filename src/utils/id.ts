import { keccak256 } from './keccak256';
import { toUtf8Bytes } from './to-utf8-bytes';

/**
 * Compute the keccak256 hash of a UTF-8 string. Commonly used to compute
 * Solidity function selectors and event topic hashes.
 *
 * Similar to ["id" in ethers.js](https://docs.ethers.io/v5/api/utils/hashing/#utils-id)
 *
 * @param text the UTF-8 string to hash
 * @returns the keccak256 hash as a hex string
 * @example
 * ```javascript
 * id('Transfer(address,address,uint256)')
 * // '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
 * ```
 * @example
 * ```javascript
 * // Get a function selector (first 4 bytes)
 * id('balanceOf(address)').slice(0, 10)
 * // '0x70a08231'
 * ```
 */
export function id(text: string): string {
  return keccak256(toUtf8Bytes(text));
}
