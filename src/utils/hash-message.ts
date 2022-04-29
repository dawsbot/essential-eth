import { Bytes, concat } from './bytes';
import { keccak256 } from './keccak256';
import { toUtf8Bytes } from './to-utf8-bytes';

export const messagePrefix = "\x19Ethereum Signed Message:\n";

export function hashMessage(message: Bytes | string) {
  if (typeof message === 'string') {
    message = Buffer.from(message);
  }
  return keccak256(
    concat([
      toUtf8Bytes(messagePrefix),
      toUtf8Bytes(String(message.length)),
      message,
    ]),
  );
}
