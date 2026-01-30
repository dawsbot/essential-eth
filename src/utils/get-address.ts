import { toChecksumAddress } from './to-checksum-address';

/**
 * Returns the checksummed address for the given address.
 * Throws if the address is invalid.
 *
 * This is an alias for {@link toChecksumAddress}, provided for compatibility
 * with [ethers.js `getAddress`](https://docs.ethers.io/v5/api/utils/address/#utils-getAddress).
 *
 * @param address the address to checksum
 * @returns the checksummed address
 * @example
 * ```javascript
 * getAddress('0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359')
 * // '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'
 * ```
 */
export function getAddress(address: string): string {
  return toChecksumAddress(address);
}
