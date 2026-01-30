import { keccak256 } from './keccak256';
import { toUtf8Bytes } from './to-utf8-bytes';

/**
 * Computes the ENS namehash of a domain name as defined in EIP-137.
 *
 * The namehash algorithm recursively hashes each label of the domain name,
 * producing a unique 32-byte identifier used by ENS contracts.
 *
 * @param name the ENS domain name to hash (e.g. 'vitalik.eth')
 * @returns the namehash as a 66-character hex string (0x-prefixed, 32 bytes)
 * @example
 * ```javascript
 * namehash('');
 * // '0x0000000000000000000000000000000000000000000000000000000000000000'
 *
 * namehash('eth');
 * // '0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae'
 *
 * namehash('vitalik.eth');
 * // '0xee6c4522aab0003e8d14cd40a6af439055fd2577951148c14b6cea9a53475835'
 * ```
 */
export function namehash(name: string): string {
  // Start with 32 zero bytes
  let node =
    '0x0000000000000000000000000000000000000000000000000000000000000000';

  if (name === '') {
    return node;
  }

  // Split name by '.' and process labels right to left
  const labels = name.split('.');
  for (let i = labels.length - 1; i >= 0; i--) {
    const labelHash = keccak256(toUtf8Bytes(labels[i]));
    // Concatenate node (32 bytes) + labelHash (32 bytes) = 64 bytes as hex
    node = keccak256('0x' + node.slice(2) + labelHash.slice(2));
  }

  return node;
}
