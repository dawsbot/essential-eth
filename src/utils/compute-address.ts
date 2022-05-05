import { utils } from 'ethers';
import { toChecksumAddress } from '..';
import { hexDataSlice } from './bytes';
import { keccak256 } from './keccak256';

export function computeAddress(key: string): string {
  const publicKey = utils.computePublicKey(key);
  return toChecksumAddress(
    hexDataSlice(keccak256(hexDataSlice(publicKey, 1)), 12),
  );
}
