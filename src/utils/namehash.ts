import { keccak256 } from './keccak256';

/**
 * Hashs a name according to the [EIP 137](https://eips.ethereum.org/EIPS/eip-137) specification.
 * Function based off of [danfinlay/eth-ens-namehash](https://github.com/danfinlay/eth-ens-namehash).
 *
 * @param name the name to hash
 * @returns the hashed name
 */
export function namehash(name: string) {
  if (!name)
    return '0x0000000000000000000000000000000000000000000000000000000000000000';

  name = name.normalize();
  const labels = name.split('.');
  let node;
  for (var i = labels.length - 1; i >= 0; i--) {
    const labelSha = keccak256(labels[i]);
    node = keccak256(Buffer.from(node + labelSha, 'hex'));
  }
  return `0x${node}`;
}
