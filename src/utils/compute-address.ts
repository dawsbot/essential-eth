import { computePublicKey, toChecksumAddress } from '..';
import { hexDataSlice } from './bytes';
import { keccak256 } from './keccak256';

/**
 * Computes the address that corresponds to a specified public or private key
 *
 * @param key the public or private key to find the address related to
 * @returns the address that corresponds to the key specified
 * @example
 */
export function computeAddress(key: string): string {
  // compressed public keys start with 0x04
  // uncompressed public keys start with 0x03 or 0x02
  if (
    !key.startsWith('0x04') &&
    !key.startsWith('0x03') &&
    !key.startsWith('0x02')
  ) {
    key = computePublicKey(key);
  }
  return toChecksumAddress(hexDataSlice(keccak256(hexDataSlice(key, 1)), 12));
}
