import { computePublicKey, toChecksumAddress } from '..';
import { hexDataSlice } from './bytes';
import { keccak256 } from './keccak256';

/**
 * Computes the address that corresponds to a specified public or private key
 *
 * @param key the public or private key to find the address related to
 *
 * @returns the address that corresponds to the key specified
 */
export function computeAddress(key: string): string {
  if (!key.startsWith('0x04') && !key.startsWith('0x03') && !key.startsWith('0x02')) {
    key = computePublicKey(key);
  }
  return toChecksumAddress(hexDataSlice(keccak256(hexDataSlice(key, 1)), 12));
}
