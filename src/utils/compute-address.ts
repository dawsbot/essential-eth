import { computePublicKey, toChecksumAddress } from '..';
import { hexDataSlice } from './bytes';
import { keccak256 } from './keccak256';

export function computeAddress(key: string): string {
  if (!key.startsWith('0x04')) {
    key = computePublicKey(key);
  }
  return toChecksumAddress(hexDataSlice(keccak256(hexDataSlice(key, 1)), 12));
}
