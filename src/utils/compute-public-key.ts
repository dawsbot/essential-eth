import { Point } from '@noble/secp256k1';
import { BytesLike, hexlify } from './bytes';

/**
 * Computes the public key from a given private key
 *
 * @param privKey the private key to find a public key from
 * @returns the public key related to the specified private key
 * @example
 * ```javascript
 * computePublicKey('0xb27cc8dea0177d910110e8d3ec5480d56c723abf433529f4063f261ffdb9297c');
 * // '0x045cd0032015eecfde49f82f4e149d804e8ac6e3a0bface32e37c72a71ceac864fe84da7e8df84342f7b11dfb753c4d158f636142b46b29cf7f0f171ae0aa4fb87'
 * ```
 * @example
 * ```javascript
 * computePublicKey([50,102,50,99,52,49,57,97,99,102,52,97,49,100,97,56,99,49,101,98,101,97,55,53,98,98,51,102,99,102,98,100]);
 * // '0x04a9cea77eca949df84f661cee153426fb51f2294b9364b4fac240df57360b9b0ac9c99e4d7966491ab4c81f8c82e0cd24ec5759832ad4ab736d22c7d90b806ee8'
 * ```
 */
export function computePublicKey(privKey: BytesLike): string {
  privKey = hexlify(privKey).slice(2);
  return '0x' + Point.fromPrivateKey(privKey).toHex();
}
