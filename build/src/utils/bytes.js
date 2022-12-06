// primarily duplicate code from https://github.com/ethers-io/ethers.js/blob/f599d6f23dad0d0acaa3828d6b7acaab2d5e455b/packages/bytes/src.ts/index.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    isBytesLike: ()=>isBytesLike,
    isBytes: ()=>isBytes,
    arrayify: ()=>arrayify,
    concat: ()=>concat,
    stripZeros: ()=>stripZeros,
    zeroPad: ()=>zeroPad,
    isHexString: ()=>isHexString,
    hexlify: ()=>hexlify,
    hexDataLength: ()=>hexDataLength,
    hexDataSlice: ()=>hexDataSlice,
    hexConcat: ()=>hexConcat,
    hexValue: ()=>hexValue,
    hexStripZeros: ()=>hexStripZeros,
    hexZeroPad: ()=>hexZeroPad
});
const _logger = require("../logger/logger");
/**
 * Check if a value can be converted to a hex string
 *
 * @param value the value to check whether or not it's Hexable
 * @returns whether or not the value is Hexable
 * @example
 * ```javascript
 * const val = tinyBig(203);
 * isHexable(val);
 * // true
 * ```
 */ function isHexable(value) {
    return !!value.toHexString;
}
function isBytesLike(value) {
    return isHexString(value) && !(value.length % 2) || isBytes(value);
}
/**
 * Checks if a value is an integer
 *
 * @param value the value to check whether or not it's an integer
 * @returns whether or not value is an integer
 * @example
 * ```javascript
 * isInteger(4)
 * // true
 * ```
 * @example
 * ```javascript
 * isInteger(6.2)
 * // false
 * ```
 */ function isInteger(value) {
    return typeof value === 'number' && value == value && value % 1 === 0;
}
function isBytes(value) {
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
    for(let i = 0; i < value.length; i++){
        const v = value[i];
        if (!isInteger(v) || v < 0 || v >= 256) {
            return false;
        }
    }
    return true;
}
function arrayify(value, options) {
    if (!options) {
        options = {};
    }
    if (typeof value === 'number') {
        _logger.logger.checkSafeUint53(value, 'invalid arrayify value');
        const result = [];
        while(value){
            result.unshift(value & 0xff);
            value = parseInt(String(value / 256));
        }
        if (result.length === 0) {
            result.push(0);
        }
        return new Uint8Array(result);
    }
    if (options.allowMissingPrefix && typeof value === 'string' && value.substring(0, 2) !== '0x') {
        value = '0x' + value;
    }
    if (isHexable(value)) {
        value = value.toHexString();
    }
    if (isHexString(value)) {
        let hex = value.substring(2);
        if (hex.length % 2) {
            if (options.hexPad === 'left') {
                hex = '0' + hex;
            } else if (options.hexPad === 'right') {
                hex += '0';
            } else {
                _logger.logger.throwArgumentError('hex data is odd-length', 'value', value);
            }
        }
        const result1 = [];
        for(let i = 0; i < hex.length; i += 2){
            result1.push(parseInt(hex.substring(i, i + 2), 16));
        }
        return new Uint8Array(result1);
    }
    if (isBytes(value)) {
        return new Uint8Array(value);
    }
    return _logger.logger.throwArgumentError('invalid arrayify value', 'value', value);
}
function concat(arrayOfBytesLike) {
    const objects = arrayOfBytesLike.map((item)=>arrayify(item));
    const length = objects.reduce((accum, item)=>accum + item.length, 0);
    const result = new Uint8Array(length);
    objects.reduce((offset, object)=>{
        result.set(object, offset);
        return offset + object.length;
    }, 0);
    return result;
}
function stripZeros(value) {
    let result = arrayify(value);
    if (result.length === 0) {
        return result;
    }
    // Find the first non-zero entry
    let start = 0;
    while(start < result.length && result[start] === 0){
        start++;
    }
    // If we started with zeros, strip them
    if (start) {
        result = result.slice(start);
    }
    return result;
}
function zeroPad(value, length) {
    value = arrayify(value);
    if (value.length > length) {
        _logger.logger.throwArgumentError('value out of range', 'value', value);
    }
    const result = new Uint8Array(length);
    result.set(value, length - value.length);
    return result;
}
function isHexString(value, length) {
    if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}
const HexCharacters = '0123456789abcdef';
function hexlify(value, options) {
    if (!options) {
        options = {};
    }
    if (typeof value === 'number') {
        _logger.logger.checkSafeUint53(value, 'invalid hexlify value');
        let hex = '';
        while(value){
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
    if (options.allowMissingPrefix && typeof value === 'string' && value.substring(0, 2) !== '0x') {
        value = '0x' + value;
    }
    if (isHexable(value)) {
        return value.toHexString();
    }
    if (isHexString(value)) {
        if (value.length % 2) {
            if (options.hexPad === 'left') {
                value = '0x0' + value.substring(2);
            } else if (options.hexPad === 'right') {
                value += '0';
            } else {
                _logger.logger.throwArgumentError('hex data is odd-length', 'value', value);
            }
        }
        return value.toLowerCase();
    }
    if (isBytes(value)) {
        let result = '0x';
        for(let i = 0; i < value.length; i++){
            const v = value[i];
            result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
        }
        return result;
    }
    return _logger.logger.throwArgumentError('invalid hexlify value', 'value', value);
}
function hexDataLength(data) {
    if (typeof data !== 'string') {
        data = hexlify(data);
    } else if (!isHexString(data) || data.length % 2) {
        return null;
    }
    return (data.length - 2) / 2;
}
function hexDataSlice(data, offset, endOffset) {
    if (typeof data !== 'string') {
        data = hexlify(data);
    } else if (!isHexString(data) || data.length % 2) {
        _logger.logger.throwArgumentError('invalid hexData', 'value', data);
    }
    offset = 2 + 2 * offset;
    if (endOffset != null) {
        return '0x' + data.substring(offset, 2 + 2 * endOffset);
    }
    return '0x' + data.substring(offset);
}
function hexConcat(items) {
    let result = '0x';
    items.forEach((item)=>{
        result += hexlify(item).substring(2);
    });
    return result;
}
function hexValue(value) {
    const trimmed = hexStripZeros(hexlify(value, {
        hexPad: 'left'
    }));
    if (trimmed === '0x') {
        return '0x0';
    }
    return trimmed;
}
function hexStripZeros(value) {
    if (typeof value !== 'string') {
        value = hexlify(value);
    }
    if (!isHexString(value)) {
        _logger.logger.throwArgumentError('invalid hex string', 'value', value);
    }
    value = value.substring(2);
    let offset = 0;
    while(offset < value.length && value[offset] === '0'){
        offset++;
    }
    return '0x' + value.substring(offset);
}
function hexZeroPad(value, length) {
    if (typeof value !== 'string') {
        value = hexlify(value);
    } else if (!isHexString(value)) {
        _logger.logger.throwArgumentError('invalid hex string', 'value', value);
    }
    if (value.length > 2 * length + 2) {
        _logger.logger.throwError('value out of range', {
            value,
            length
        });
    }
    while(value.length < 2 * length + 2){
        value = '0x0' + value.substring(2);
    }
    return value;
} // export function splitSignature(signature: SignatureLike): Signature {
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
