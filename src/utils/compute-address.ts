import { hexDataSlice } from './bytes';
import { computePublicKey } from './compute-public-key';
import { keccak256 } from './keccak256';
import { toChecksumAddress } from './to-checksum-address';

/**
 * Computes the address that corresponds to a specified public or private key
 *
 * @param key the public or private key to find the address related to
 * @returns the address that corresponds to the key specified
 * @example
 * ```javascript
 * computeAddress('0x0458eb591f407aef12936bd2989ca699cf5061de9c4964dd6eb6005fd8f580c407434447e813969a1be6e9954b002cad84dfc67a69e032b273e4695e7d0db2d952'); // public key
 * // '0xA2902059a7BF992f1450BACD7357CCAa5cC8336a'
 * ```
 * @example
 * ```javascript
 * computeAddress('0x2f2c419acf4a1da8c1ebea75bb3fcfbd3ec2aa3bf0162901ccdc2f38b8f92427'); // private key
 * // '0xA2902059a7BF992f1450BACD7357CCAa5cC8336a'
 * ```
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
