import createKeccakHash from 'keccak';

/**
 * Returns an Ethereum addrses in proper mixed-case checksum.
 *
 * @param address - An Ethereum address. Mixed, lower, and uppercase are all valid
 *
 * @example
 * ```javascript
 * toChecksumAddress('0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359');
 * // '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'
 * ```
 */
export function toChecksumAddress(address: string) {
  address = address.toLowerCase().replace('0x', '');
  const hash = createKeccakHash('keccak256').update(address).digest('hex');
  let ret = '0x';

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
}
