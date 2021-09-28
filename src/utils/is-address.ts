import { toChecksumAddress } from '..';
import { validateType } from '../shared/validate-type';

/**
 * Returns a boolean as to whether the input is a valid address.
 * Does NOT support ICAP addresses
 */
export function isAddress(address: string) {
  validateType(address, ['string']);
  try {
    toChecksumAddress(address);
    return true;
  } catch (error) {
    return false;
  }
}
