import { Point } from '@noble/secp256k1';
import { BytesLike, hexlify } from './bytes';

export function computePublicKey(key: BytesLike): string {
  const bytes = hexlify(key).slice(2);
  return '0x' + Point.fromPrivateKey(bytes).toHex();
}
