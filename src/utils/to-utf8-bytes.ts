/**
 *
 * @param data
 * @example
 */
export function toUtf8Bytes(data: string): Uint8Array {
  return new Uint8Array(Buffer.from(data));
}
