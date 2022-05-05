import { arrayify, BytesLike, SignatureLike } from './bytes';
import { computeAddress } from './compute-address';
import { recoverPublicKey } from './recover-public-key';
export function recoverAddress(
  digest: BytesLike,
  signature: SignatureLike,
): string {
  return computeAddress(recoverPublicKey(arrayify(digest), signature));
}
