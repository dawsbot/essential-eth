import { hexlify } from './bytes';
import { toUtf8Bytes } from './to-utf8-bytes';
import { toUtf8String } from './to-utf8-string';

/**
 * Encode a string as a bytes32 hex value. The string must be 31 bytes or
 * shorter, as one byte is used for the null terminator in Solidity.
 *
 * Similar to ["encodeBytes32String" in ethers.js v6](https://docs.ethers.io/v6/api/abi/#encodeBytes32String)
 * @param text the string to encode (max 31 bytes UTF-8)
 * @returns a 66-character hex string (bytes32)
 * @example
 * ```javascript
 * encodeBytes32String('essential-eth')
 * // '0x657373656e7469616c2d657468000000000000000000000000000000000000'
 * ```
 */
export function encodeBytes32String(text: string): string {
  const bytes = toUtf8Bytes(text);
  if (bytes.length > 31) {
    throw new Error('bytes32 string must be less than 32 bytes');
  }
  // Right-pad with zeros to 32 bytes
  const padded = new Uint8Array(32);
  padded.set(bytes);
  return hexlify(padded);
}

/**
 * Decode a bytes32 hex value into a string, stripping trailing null bytes.
 *
 * Similar to ["decodeBytes32String" in ethers.js v6](https://docs.ethers.io/v6/api/abi/#decodeBytes32String)
 * @param bytes32 the bytes32 hex string to decode
 * @returns the decoded string
 * @example
 * ```javascript
 * decodeBytes32String('0x657373656e7469616c2d657468000000000000000000000000000000000000')
 * // 'essential-eth'
 * ```
 */
export function decodeBytes32String(bytes32: string): string {
  // Strip trailing zero bytes
  let hex = bytes32;
  if (hex.startsWith('0x') || hex.startsWith('0X')) {
    hex = hex.slice(2);
  }
  // Remove trailing 00 pairs
  hex = hex.replace(/(00)+$/, '');
  if (hex.length === 0) return '';
  return toUtf8String('0x' + hex);
}
