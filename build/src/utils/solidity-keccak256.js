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
    pack: ()=>pack,
    solidityKeccak256: ()=>solidityKeccak256
});
const _buffer = require("buffer");
const _encodeDecodeTransaction = require("../classes/utils/encode-decode-transaction");
const _logger = require("../logger/logger");
const _tinyBig = require("../shared/tiny-big/tiny-big");
const _bytes = require("./bytes");
const _keccak256 = require("./keccak256");
const regexBytes = new RegExp('^bytes([0-9]+)$');
const regexNumber = new RegExp('^(u?int)([0-9]*)$');
const regexArray = new RegExp('^(.*)\\[([0-9]*)\\]$');
/**
 * Packs a type and value together into a UTF-8 Byte Array
 *
 * @internal
 * @param type the Solidity type used for the value given
 * @param value the value to pack with its type
 * @param isArray whether the specified data is in an array
 * @returns packed data consisting of the type and value
 * @example N/A - internal function
 */ function _pack(type, value, isArray) {
    switch(type){
        case 'address':
            if (isArray) {
                return (0, _bytes.zeroPad)(value, 32);
            }
            return (0, _bytes.arrayify)(value);
        case 'string':
            return _buffer.Buffer.from(value);
        case 'bytes':
            return (0, _bytes.arrayify)(value);
        case 'bool':
            value = value ? '0x01' : '0x00';
            if (isArray) {
                return (0, _bytes.zeroPad)(value, 32);
            }
            return (0, _bytes.arrayify)(value);
    }
    let match = type.match(regexNumber);
    if (match) {
        //let signed = (match[1] === "int")
        let size = parseInt(match[2] || '256');
        if (match[2] && String(size) !== match[2] || size % 8 !== 0 || size === 0 || size > 256) {
            _logger.logger.throwArgumentError('invalid number type', 'type', type);
        }
        if (isArray) {
            size = 256;
        }
        value = (0, _tinyBig.tinyBig)(value).toTwos(size).toNumber();
        const hexValue = (0, _bytes.hexlify)(value);
        return (0, _bytes.zeroPad)(hexValue, size / 8);
    }
    match = type.match(regexBytes);
    if (match) {
        const size1 = parseInt(match[1]);
        if (String(size1) !== match[1] || size1 === 0 || size1 > 32) {
            _logger.logger.throwArgumentError('invalid bytes type', 'type', type);
        }
        if ((0, _bytes.arrayify)(value).byteLength !== size1) {
            _logger.logger.throwArgumentError(`invalid value for ${type}`, 'value', value);
        }
        if (isArray) {
            return (0, _bytes.arrayify)((value + _encodeDecodeTransaction.hexFalse).substring(0, 66));
        }
        return value;
    }
    match = type.match(regexArray);
    if (match && Array.isArray(value)) {
        const baseType = match[1];
        const count = parseInt(match[2] || String(value.length));
        if (count != value.length) {
            _logger.logger.throwArgumentError(`invalid array length for ${type}`, 'value', value);
        }
        const result = [];
        value.forEach(function(value) {
            result.push(_pack(baseType, value, true));
        });
        return (0, _bytes.concat)(result);
    }
    return _logger.logger.throwArgumentError('invalid type', 'type', type);
}
function pack(types, values) {
    if (types.length != values.length) {
        _logger.logger.throwArgumentError('wrong number of values; expected ${ types.length }', 'values', values);
    }
    const tight = [];
    types.forEach(function(type, index) {
        tight.push(_pack(type, values[index]));
    });
    return (0, _bytes.hexlify)((0, _bytes.concat)(tight));
}
function solidityKeccak256(types, values) {
    return (0, _keccak256.keccak256)(pack(types, values));
}
