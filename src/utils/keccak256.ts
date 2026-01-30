import { keccak_256 } from '@noble/hashes/sha3.js';
import { bytesToHex } from '@noble/hashes/utils.js';
import type { BytesLike } from './bytes';

/**
 * Hashes data into a Keccak256 hex string
 *
 * @param data the data to be hashed using Keccak256
 * @returns a hex string with data hashed using Keccak256
 * @example
 * ```javascript
 * keccak256('essential-eth');
 * // '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
 *
 * keccak256('0x123');
 * // '0x5fa2358263196dbbf23d1ca7a509451f7a2f64c15837bfbb81298b1e3e24e4fa'
 * ```
 */
export function keccak256(data: BytesLike): string {
  let bytes: Uint8Array;
  if (typeof data === 'string') {
    const hex = data.replace(/^0x/, '');
    bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
  } else {
    bytes = new Uint8Array(data as any);
  }
  return '0x' + bytesToHex(keccak_256(bytes));
}
