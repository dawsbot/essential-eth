/**
 * Converts a string into a UTF-8 Byte Array
 * @param data the input to be converted to a UTF-8 Byte Array
 * @returns the specified data as a UTF-8 Byte Array
 * @example
 * ```javascript
 * toUtf8Bytes('essential-eth');
 * // Uint8Array { [Iterator] 0: 101, 1: 115, 2: 115, 3: 101, 4: 110, 5: 116, 6: 105, 7: 97, 8: 108, 9: 45, 10: 101, 11: 116, 12: 104 }
 *
 * toUtf8Bytes('ethereum');
 * // Uint8Array { [Iterator]  0: 101, 1: 116, 2: 104, 3: 101, 4: 114, 5: 101, 6: 117, 7: 109 }
 * ```
 */
export function toUtf8Bytes(data: string): Uint8Array {
  return new Uint8Array(Buffer.from(data));
}
