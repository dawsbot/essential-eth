import { arrayify } from './bytes';
import type { BytesLike } from './bytes';

/**
 * Decode a BytesLike value into a UTF-8 string.
 *
 * Similar to ["toUtf8String" in ethers.js](https://docs.ethers.io/v5/api/utils/strings/#utils-toUtf8String)
 *
 * @param bytes the bytes to decode
 * @returns the decoded UTF-8 string
 * @example
 * ```javascript
 * toUtf8String(new Uint8Array([101, 116, 104]))
 * // 'eth'
 * ```
 * @example
 * ```javascript
 * toUtf8String('0x657468')
 * // 'eth'
 * ```
 */
export function toUtf8String(bytes: BytesLike): string {
  return new TextDecoder().decode(arrayify(bytes));
}
