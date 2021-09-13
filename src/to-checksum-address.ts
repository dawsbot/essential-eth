import createKeccakHash from 'keccak';

/**
 * Returns an Ethereum address in proper mixed-case checksum.
 *
 * @param address - An Ethereum address. Mixed, lower, and uppercase are all valid
 *
 * @example
 * ```javascript
 * toChecksumAddress('0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359');
 * // '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'
 * ```
 *
 * Similar to ["getAddress" in ethers.js](https://docs.ethers.io/v4/api-utils.html#utils-getaddress)
 *
 * Similar to ["toChecksumAddress" in web3](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#tochecksumaddress)
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
