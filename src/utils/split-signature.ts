import { logger } from './../logger/logger';
import type { Signature, SignatureLike } from './bytes';
import {
  arrayify,
  hexlify,
  hexZeroPad,
  isBytesLike,
  isHexString,
  zeroPad,
} from './bytes';

/**
 * Expands a signature into the full signature object and fills in missing properties.
 *
 * Same as ["splitSignature" in ethers.js](https://docs.ethers.io/v5/api/utils/bytes/#utils-splitSignature)
 *
 * @param signature the signature object to split, parse, and compute missing properties from
 * @returns a full signature object with all properties filled
 * @example
 * ```javascript
 * const signature = '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee331b';
 * splitSignature(signature);
 *  {
 *    r: "0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b39716",
 *    s: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33",
 *    _vs: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33",
 *    recoveryParam: 0,
 *    v: 27,
 *    yParityAndS: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33",
 *    compact: "0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33"
 *  }
 * ```
 */
export function splitSignature(signature: SignatureLike): Signature {
  const result = {
    r: '0x',
    s: '0x',
    _vs: '0x',
    recoveryParam: 0,
    v: 0,
    yParityAndS: '0x',
    compact: '0x',
  };
  if (isBytesLike(signature)) {
    const bytes = arrayify(signature);
    // Get the r, s and v
    if (bytes.length === 64) {
      // EIP-2098; pull the v from the top bit of s and clear it
      result.v = 27 + (bytes[32] >> 7);
      bytes[32] &= 0x7f;
      result.r = hexlify(bytes.slice(0, 32));
      result.s = hexlify(bytes.slice(32, 64));
    } else if (bytes.length === 65) {
      result.r = hexlify(bytes.slice(0, 32));
      result.s = hexlify(bytes.slice(32, 64));
      result.v = bytes[64];
    } else {
      logger.throwArgumentError(
        'invalid signature string',
        'signature',
        signature,
      );
    }
    // Allow a recid to be used as the v
    if (result.v < 27) {
      if (result.v === 0 || result.v === 1) {
        result.v += 27;
      } else {
        logger.throwArgumentError(
          'signature invalid v byte',
          'signature',
          signature,
        );
      }
    }
    // Compute recoveryParam from v
    result.recoveryParam = 1 - (result.v % 2);
    // Compute _vs from recoveryParam and s
    if (result.recoveryParam) {
      bytes[32] |= 0x80;
    }
    result._vs = hexlify(bytes.slice(32, 64));
  } else {
    result.r = signature.r;
    result.s = signature.s as string;
    result.v = signature.v as number;
    result.recoveryParam = signature.recoveryParam as number;
    result._vs = signature._vs as string;
    // If the _vs is available, use it to populate missing s, v and recoveryParam
    // and verify non-missing s, v and recoveryParam
    if (result._vs != null) {
      const vs_1 = zeroPad(arrayify(result._vs), 32);
      result._vs = hexlify(vs_1);
      // Set or check the recid
      const recoveryParam = vs_1[0] >= 128 ? 1 : 0;
      if (result.recoveryParam == null) {
        result.recoveryParam = recoveryParam;
      } else if (result.recoveryParam !== recoveryParam) {
        logger.throwArgumentError(
          'signature recoveryParam mismatch _vs',
          'signature',
          signature,
        );
      }
      // Set or check the s
      vs_1[0] &= 0x7f;
      const s = hexlify(vs_1);
      if (result.s == null) {
        result.s = s;
      } else if (result.s !== s) {
        logger.throwArgumentError(
          'signature v mismatch _vs',
          'signature',
          signature,
        );
      }
    }
    // Use recid and v to populate each other
    if (result.recoveryParam == null) {
      if (result.v == null) {
        logger.throwArgumentError(
          'signature missing v and recoveryParam',
          'signature',
          signature,
        );
      } else if (result.v === 0 || result.v === 1) {
        result.recoveryParam = result.v;
      } else {
        result.recoveryParam = 1 - (result.v % 2);
      }
    } else {
      if (result.v == null) {
        result.v = 27 + result.recoveryParam;
      } else {
        const recId =
          result.v === 0 || result.v === 1 ? result.v : 1 - (result.v % 2);
        if (result.recoveryParam !== recId) {
          logger.throwArgumentError(
            'signature recoveryParam mismatch v',
            'signature',
            signature,
          );
        }
      }
    }
    if (result.r == null || !isHexString(result.r)) {
      logger.throwArgumentError(
        'signature missing or invalid r',
        'signature',
        signature,
      );
    } else {
      result.r = hexZeroPad(result.r, 32);
    }
    if (result.s == null || !isHexString(result.s)) {
      logger.throwArgumentError(
        'signature missing or invalid s',
        'signature',
        signature,
      );
    } else {
      result.s = hexZeroPad(result.s, 32);
    }
    const vs = arrayify(result.s);
    if (vs[0] >= 128) {
      logger.throwArgumentError(
        'signature s out of range',
        'signature',
        signature,
      );
    }
    if (result.recoveryParam) {
      vs[0] |= 0x80;
    }
    const _vs = hexlify(vs);
    if (result._vs) {
      if (!isHexString(result._vs)) {
        logger.throwArgumentError(
          'signature invalid _vs',
          'signature',
          signature,
        );
      }
      result._vs = hexZeroPad(result._vs, 32);
    }
    // Set or check the _vs
    if (result._vs == null) {
      result._vs = _vs;
    } else if (result._vs !== _vs) {
      logger.throwArgumentError(
        'signature _vs mismatch v and s',
        'signature',
        signature,
      );
    }
  }
  result.yParityAndS = result._vs;
  result.compact = result.r + result.yParityAndS.substring(2);
  return result;
}
