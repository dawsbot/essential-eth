// primary duplicate code from https://github.com/ethers-io/ethers.js/blob/f599d6f23dad0d0acaa3828d6b7acaab2d5e455b/packages/bytes/src.ts/index.ts

import { logger } from '../logger/logger';

///////////////////////////////
// Exported Types

export type Bytes = ArrayLike<number>;

/**
 * @example
 * [1,2,3]
 *
 * @example
 * 0x123
 *
 * @example
 * '0x123'
 */
export type BytesLike = Bytes | string | number;

export interface DataOptions {
  allowMissingPrefix?: boolean;
  hexPad?: 'left' | 'right' | null;
}

export interface Hexable {
  toHexString(): string;
}

export type SignatureLike =
  | {
      r: string;
      s?: string;
      _vs?: string;
      recoveryParam?: number;
      v?: number;
    }
  | BytesLike;

export interface Signature {
  r: string;

  s: string;
  _vs: string;

  recoveryParam: number;
  v: number;

  yParityAndS: string;
  compact: string;
}

function isHexable(value: any): value is Hexable {
  return !!value.toHexString;
}

/**
 * Returns true if and only if value is a valid [Bytes](#bytes) or DataHexString
 * * Same as [`ethers.utils.isBytesLike`](https://docs.ethers.io/v5/api/utils/bytes/#utils-isBytesLike)
 *
 * @example
 * ```js
 * provider.isBytesLike([1,2,3]);
 * // true
 * ```
 *
 * @example
 * ```js
 * provider.isBytesLike(false);
 * // false
 * ```
 *
 * @example
 * ```js
 * provider.isBytesLike(new Uint8Array(1));
 * // true
 * ```
 */
export function isBytesLike(value: any): value is BytesLike {
  return (isHexString(value) && !(value.length % 2)) || isBytes(value);
}

function isInteger(value: number) {
  return typeof value === 'number' && value == value && value % 1 === 0;
}

/**
 * Returns true if and only if value is a valid [Bytes](#bytes)
 * * Same as [`ethers.utils.isBytes`](https://docs.ethers.io/v5/api/utils/bytes/#utils-isBytes)
 *
 * @example
 * ```js
 * provider.isBytes([1,2,3]);
 * // true
 * ```
 *
 * @example
 * ```js
 * provider.isBytes(false);
 * // false
 * ```
 *
 * @example
 * ```js
 * provider.isBytes(new Uint8Array(1));
 * // true
 * ```
 */
export function isBytes(value: any): value is Bytes {
  if (value == null) {
    return false;
  }

  if (value.constructor === Uint8Array) {
    return true;
  }
  if (typeof value === 'string') {
    return false;
  }
  if (!isInteger(value.length) || value.length < 0) {
    return false;
  }

  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    if (!isInteger(v) || v < 0 || v >= 256) {
      return false;
    }
  }
  return true;
}

/**
 * Converts DataHexStringOrArrayish to a Uint8Array
 * * Same as [`ethers.utils.arrayify`](https://docs.ethers.io/v5/api/utils/bytes/#utils-arrayify)
 *
 * @example
 * ```js
 * provider.arrayify(1);
 * // Uint8Array(1) [ 1 ]
 * ```
 *
 * @example
 * ```js
 * provider.arrayify(0x1234);
 * // Uint8Array(2) [ 18, 52 ]
 * ```
 *
 * @example
 * ```js
 * provider.arrayify('0x1', { hexPad: 'right' });
 * // Uint8Array(1) [ 16 ]
 * ```
 */
export function arrayify(
  value: BytesLike | Hexable | number,
  options?: DataOptions,
): Uint8Array {
  if (!options) {
    options = {};
  }

  if (typeof value === 'number') {
    logger.checkSafeUint53(value, 'invalid arrayify value');

    const result = [];
    while (value) {
      result.unshift(value & 0xff);
      value = parseInt(String(value / 256));
    }
    if (result.length === 0) {
      result.push(0);
    }

    return new Uint8Array(result);
  }

  if (
    options.allowMissingPrefix &&
    typeof value === 'string' &&
    value.substring(0, 2) !== '0x'
  ) {
    value = '0x' + value;
  }

  if (isHexable(value)) {
    value = value.toHexString();
  }

  if (isHexString(value)) {
    let hex = (<string>value).substring(2);
    if (hex.length % 2) {
      if (options.hexPad === 'left') {
        hex = '0' + hex;
      } else if (options.hexPad === 'right') {
        hex += '0';
      } else {
        logger.throwArgumentError('hex data is odd-length', 'value', value);
      }
    }

    const result = [];
    for (let i = 0; i < hex.length; i += 2) {
      result.push(parseInt(hex.substring(i, i + 2), 16));
    }

    return new Uint8Array(result);
  }

  if (isBytes(value)) {
    return new Uint8Array(value);
  }

  return logger.throwArgumentError('invalid arrayify value', 'value', value);
}

export function concat(items: ReadonlyArray<BytesLike>): Uint8Array {
  const objects = items.map((item) => arrayify(item));
  const length = objects.reduce((accum, item) => accum + item.length, 0);

  const result = new Uint8Array(length);

  objects.reduce((offset, object) => {
    result.set(object, offset);
    return offset + object.length;
  }, 0);

  return result;
}

export function stripZeros(value: BytesLike): Uint8Array {
  let result: Uint8Array = arrayify(value);

  if (result.length === 0) {
    return result;
  }

  // Find the first non-zero entry
  let start = 0;
  while (start < result.length && result[start] === 0) {
    start++;
  }

  // If we started with zeros, strip them
  if (start) {
    result = result.slice(start);
  }

  return result;
}

export function zeroPad(value: BytesLike, length: number): Uint8Array {
  value = arrayify(value);

  if (value.length > length) {
    logger.throwArgumentError('value out of range', 'value', value);
  }

  const result = new Uint8Array(length);
  result.set(value, length - value.length);
  return result;
}

/**
 * Returns true if and only if object is a valid hex string.
 * If length is specified and object is not a valid DataHexString of length bytes, an InvalidArgument error is thrown.
 * * Same as [`ethers.utils.isHexString`](https://docs.ethers.io/v5/api/utils/bytes/#utils-isHexString)
 */
export function isHexString(value: any, length?: number): boolean {
  if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}

const HexCharacters = '0123456789abcdef';

/**
 * @example
 * ```js
 * hexlify(4);
 * // '0x04'
 *
 * hexlify(14);
 * // '0x0e'
 * ```
 */
export function hexlify(
  value: BytesLike | Hexable | number | bigint,
  options?: DataOptions,
): string {
  if (!options) {
    options = {};
  }

  if (typeof value === 'number') {
    logger.checkSafeUint53(value, 'invalid hexlify value');

    let hex = '';
    while (value) {
      hex = HexCharacters[value & 0xf] + hex;
      value = Math.floor(value / 16);
    }

    if (hex.length) {
      if (hex.length % 2) {
        hex = '0' + hex;
      }
      return '0x' + hex;
    }

    return '0x00';
  }

  if (typeof value === 'bigint') {
    value = value.toString(16);
    if (value.length % 2) {
      return '0x0' + value;
    }
    return '0x' + value;
  }

  if (
    options.allowMissingPrefix &&
    typeof value === 'string' &&
    value.substring(0, 2) !== '0x'
  ) {
    value = '0x' + value;
  }

  if (isHexable(value)) {
    return value.toHexString();
  }

  if (isHexString(value)) {
    if ((<string>value).length % 2) {
      if (options.hexPad === 'left') {
        value = '0x0' + (<string>value).substring(2);
      } else if (options.hexPad === 'right') {
        value += '0';
      } else {
        logger.throwArgumentError('hex data is odd-length', 'value', value);
      }
    }
    return (<string>value).toLowerCase();
  }

  if (isBytes(value)) {
    let result = '0x';
    for (let i = 0; i < value.length; i++) {
      const v = value[i];
      result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
    }
    return result;
  }

  return logger.throwArgumentError('invalid hexlify value', 'value', value);
}

export function hexDataLength(data: BytesLike) {
  if (typeof data !== 'string') {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    return null;
  }

  return (data.length - 2) / 2;
}

export function hexDataSlice(
  data: BytesLike,
  offset: number,
  endOffset?: number,
): string {
  if (typeof data !== 'string') {
    data = hexlify(data);
  } else if (!isHexString(data) || data.length % 2) {
    logger.throwArgumentError('invalid hexData', 'value', data);
  }

  offset = 2 + 2 * offset;

  if (endOffset != null) {
    return '0x' + data.substring(offset, 2 + 2 * endOffset);
  }

  return '0x' + data.substring(offset);
}

export function hexConcat(items: ReadonlyArray<BytesLike>): string {
  let result = '0x';
  items.forEach((item) => {
    result += hexlify(item).substring(2);
  });
  return result;
}

export function hexValue(value: BytesLike | Hexable | number | bigint): string {
  const trimmed = hexStripZeros(hexlify(value, { hexPad: 'left' }));
  if (trimmed === '0x') {
    return '0x0';
  }
  return trimmed;
}

export function hexStripZeros(value: BytesLike): string {
  if (typeof value !== 'string') {
    value = hexlify(value);
  }

  if (!isHexString(value)) {
    logger.throwArgumentError('invalid hex string', 'value', value);
  }
  value = value.substring(2);
  let offset = 0;
  while (offset < value.length && value[offset] === '0') {
    offset++;
  }
  return '0x' + value.substring(offset);
}

/**
 * Returns a hex string padded to a specified length of bytes.
 *
 * Similar to ["hexZeroPad" in ethers.js](https://docs.ethers.io/v5/api/utils/bytes/#utils-hexZeroPad)
 *
 * Differs from ["padLeft" in web3.js](https://web3js.readthedocs.io/en/v1.7.1/web3-utils.html#padleft) because web3 counts by characters, not bytes.
 *
 * @param hexValue - A hex-string, hex-number, or decimal number (auto-converts to base-16) to be padded
 * @param length - The final length in bytes
 *
 * @throws - If the value is not a hex string or number
 * @throws - If the value is longer than the length
 *
 * @example
 * ```javascript
 * hexZeroPad('0x60', 2);
 * // '0x0060'
 * ```
 *
 * @example
 * ```javascript
 * hexZeroPad(0x60, 3);
 * // '0x000060'
 * ```
 *
 * @example
 * ```javascript
 * hexZeroPad('12345', 1);
 * // Throws
 * ```
 */
export function hexZeroPad(value: BytesLike, length: number): string {
  if (typeof value !== 'string') {
    value = hexlify(value);
  } else if (!isHexString(value)) {
    logger.throwArgumentError('invalid hex string', 'value', value);
  }

  if (value.length > 2 * length + 2) {
    logger.throwError('value out of range', { value, length });
  }

  while (value.length < 2 * length + 2) {
    value = '0x0' + value.substring(2);
  }

  return value;
}

// export function splitSignature(signature: SignatureLike): Signature {
//   const result: Signature = {
//     r: '0x',
//     s: '0x',
//     _vs: '0x',
//     recoveryParam: 0,
//     v: 0,
//     yParityAndS: '0x',
//     compact: '0x',
//   };

//   if (isBytesLike(signature)) {
//     const bytes: Uint8Array = arrayify(signature);

//     // Get the r, s and v
//     if (bytes.length === 64) {
//       // EIP-2098; pull the v from the top bit of s and clear it
//       result.v = 27 + (bytes[32] >> 7);
//       bytes[32] &= 0x7f;

//       result.r = hexlify(bytes.slice(0, 32));
//       result.s = hexlify(bytes.slice(32, 64));
//     } else if (bytes.length === 65) {
//       result.r = hexlify(bytes.slice(0, 32));
//       result.s = hexlify(bytes.slice(32, 64));
//       result.v = bytes[64];
//     } else {
//       logger.throwArgumentError(
//         'invalid signature string',
//         'signature',
//         signature,
//       );
//     }

//     // Allow a recid to be used as the v
//     if (result.v < 27) {
//       if (result.v === 0 || result.v === 1) {
//         result.v += 27;
//       } else {
//         logger.throwArgumentError(
//           'signature invalid v byte',
//           'signature',
//           signature,
//         );
//       }
//     }

//     // Compute recoveryParam from v
//     result.recoveryParam = 1 - (result.v % 2);

//     // Compute _vs from recoveryParam and s
//     if (result.recoveryParam) {
//       bytes[32] |= 0x80;
//     }
//     result._vs = hexlify(bytes.slice(32, 64));
//   } else {
//     result.r = signature.r;
//     result.s = signature.s;
//     result.v = signature.v;
//     result.recoveryParam = signature.recoveryParam;
//     result._vs = signature._vs;

//     // If the _vs is available, use it to populate missing s, v and recoveryParam
//     // and verify non-missing s, v and recoveryParam
//     if (result._vs != null) {
//       const vs = zeroPad(arrayify(result._vs), 32);
//       result._vs = hexlify(vs);

//       // Set or check the recid
//       const recoveryParam = vs[0] >= 128 ? 1 : 0;
//       if (result.recoveryParam == null) {
//         result.recoveryParam = recoveryParam;
//       } else if (result.recoveryParam !== recoveryParam) {
//         logger.throwArgumentError(
//           'signature recoveryParam mismatch _vs',
//           'signature',
//           signature,
//         );
//       }

//       // Set or check the s
//       vs[0] &= 0x7f;
//       const s = hexlify(vs);
//       if (result.s == null) {
//         result.s = s;
//       } else if (result.s !== s) {
//         logger.throwArgumentError(
//           'signature v mismatch _vs',
//           'signature',
//           signature,
//         );
//       }
//     }

//     // Use recid and v to populate each other
//     if (result.recoveryParam == null) {
//       if (result.v == null) {
//         logger.throwArgumentError(
//           'signature missing v and recoveryParam',
//           'signature',
//           signature,
//         );
//       } else if (result.v === 0 || result.v === 1) {
//         result.recoveryParam = result.v;
//       } else {
//         result.recoveryParam = 1 - (result.v % 2);
//       }
//     } else {
//       if (result.v == null) {
//         result.v = 27 + result.recoveryParam;
//       } else {
//         const recId =
//           result.v === 0 || result.v === 1 ? result.v : 1 - (result.v % 2);
//         if (result.recoveryParam !== recId) {
//           logger.throwArgumentError(
//             'signature recoveryParam mismatch v',
//             'signature',
//             signature,
//           );
//         }
//       }
//     }

//     if (result.r == null || !isHexString(result.r)) {
//       logger.throwArgumentError(
//         'signature missing or invalid r',
//         'signature',
//         signature,
//       );
//     } else {
//       result.r = hexZeroPad(result.r, 32);
//     }

//     if (result.s == null || !isHexString(result.s)) {
//       logger.throwArgumentError(
//         'signature missing or invalid s',
//         'signature',
//         signature,
//       );
//     } else {
//       result.s = hexZeroPad(result.s, 32);
//     }

//     const vs = arrayify(result.s);
//     if (vs[0] >= 128) {
//       logger.throwArgumentError(
//         'signature s out of range',
//         'signature',
//         signature,
//       );
//     }
//     if (result.recoveryParam) {
//       vs[0] |= 0x80;
//     }
//     const _vs = hexlify(vs);

//     if (result._vs) {
//       if (!isHexString(result._vs)) {
//         logger.throwArgumentError(
//           'signature invalid _vs',
//           'signature',
//           signature,
//         );
//       }
//       result._vs = hexZeroPad(result._vs, 32);
//     }

//     // Set or check the _vs
//     if (result._vs == null) {
//       result._vs = _vs;
//     } else if (result._vs !== _vs) {
//       logger.throwArgumentError(
//         'signature _vs mismatch v and s',
//         'signature',
//         signature,
//       );
//     }
//   }

//   result.yParityAndS = result._vs;
//   result.compact = result.r + result.yParityAndS.substring(2);

//   return result;
// }

// export function joinSignature(signature: SignatureLike): string {
//   signature = splitSignature(signature);

//   return hexlify(
//     concat([
//       signature.r,
//       signature.s,
//       signature.recoveryParam ? '0x1c' : '0x1b',
//     ]),
//   );
// }
