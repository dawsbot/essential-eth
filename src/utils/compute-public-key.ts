import { Point } from '@noble/secp256k1';
import { BytesLike, hexlify } from './bytes';

/**
 * Computes the public key from a given private key
 *
 * @param key the private key to find a public key from
 * @param privKey
 * @returns the public key
 * @example
 */
export function computePublicKey(privKey: BytesLike): string {
  privKey = hexlify(privKey).slice(2);
  return '0x' + Point.fromPrivateKey(privKey).toHex();
}
