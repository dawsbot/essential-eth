import type { Bytes} from '../index';
import { concat, keccak256, toUtf8Bytes } from '../index';

const messagePrefix = '\x19Ethereum Signed Message:\n';

/**
 * Computes the EIP-191 personal message digest of message.
 * Personal messages are converted to UTF-8 bytes and prefixed with \x19Ethereum Signed Message: and the length of message.
 *
 * @param message the message to hash
 * @returns a message hashed using Keccak256 that matches the EIP-191 standard
 * @example
 * ```javascript
 * hashMessage("Hello World");
 * // '0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2'
 * ```
 */
export function hashMessage(message: Bytes | string): string {
  if (typeof message === 'string') {
    message = toUtf8Bytes(message);
  }
  return keccak256(
    concat([
      toUtf8Bytes(messagePrefix),
      toUtf8Bytes(String(message.length)),
      message,
    ]),
  );
}
