import { Keccak } from 'sha3';
import { validateType } from '../shared/validate-type';

/**
 * Returns an Ethereum address in proper mixed-case checksum.
 * Does NOT support ICAP
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
  validateType(address, ['string']);
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    throw new Error(`Invalid Ethereum address "${address}"`);
  }

  const _address = address.toLowerCase().replace(/^0x/i, '');
  const keccak = new Keccak(256);
  const addressHash = keccak.update(_address).digest('hex').replace(/^0x/i, '');
  let checksumAddress = '0x';

  for (let i = 0; i < _address.length; i++) {
    // If ith character is 8 to f then make it uppercase
    if (parseInt(addressHash[i], 16) > 7) {
      checksumAddress += _address[i].toUpperCase();
    } else {
      checksumAddress += _address[i];
    }
  }

  if (
    address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) &&
    checksumAddress !== address
  ) {
    throw new Error(`Invalid Checksum address for "${address}"`);
  }
  return checksumAddress;
}
