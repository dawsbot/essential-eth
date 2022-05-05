import { Point } from '@noble/secp256k1';
import { BytesLike, hexlify, SignatureLike } from './bytes';
import { splitSignature } from './split-signature';

export function recoverPublicKey(
  digest: BytesLike,
  signature: SignatureLike,
): string {
  let msg;
  if (typeof digest === 'string') msg = digest.slice(2);
  else msg = hexlify(digest).slice(2);
  const sig = splitSignature(signature);
  return (
    '0x' +
    Point.fromSignature(msg, sig.compact.slice(2), sig.recoveryParam).toHex()
  );
}
