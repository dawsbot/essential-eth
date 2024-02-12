import { hexFalse } from '../classes/utils/encode-decode-transaction';
import { logger } from '../logger/logger';
import { tinyBig } from '../shared/tiny-big/tiny-big';
import { arrayify, concat, hexlify, zeroPad } from './bytes';
import { keccak256 } from './keccak256';

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
 */
function _pack(type: string, value: any, isArray?: boolean): Uint8Array {
  switch (type) {
    case 'address':
      if (isArray) {
        return zeroPad(value, 32);
      }
      return arrayify(value);
    case 'string':
      return Buffer.from(value);
    case 'bytes':
      return arrayify(value);
    case 'bool':
      value = value ? '0x01' : '0x00';
      if (isArray) {
        return zeroPad(value, 32);
      }
      return arrayify(value);
  }

  let match = type.match(regexNumber);
  if (match) {
    //let signed = (match[1] === "int")
    let size = parseInt(match[2] || '256');

    if (
      (match[2] && String(size) !== match[2]) ||
      size % 8 !== 0 ||
      size === 0 ||
      size > 256
    ) {
      logger.throwArgumentError('invalid number type', 'type', type);
    }

    if (isArray) {
      size = 256;
    }

    value = tinyBig(value).toTwos(size).toNumber();
    const hexValue = hexlify(value);
    return zeroPad(hexValue, size / 8);
  }

  match = type.match(regexBytes);
  if (match) {
    const size = parseInt(match[1]);

    if (String(size) !== match[1] || size === 0 || size > 32) {
      logger.throwArgumentError('invalid bytes type', 'type', type);
    }
    if (arrayify(value).byteLength !== size) {
      logger.throwArgumentError(`invalid value for ${type}`, 'value', value);
    }
    if (isArray) {
      return arrayify((value + hexFalse).substring(0, 66));
    }
    return value;
  }

  match = type.match(regexArray);
  if (match && Array.isArray(value)) {
    const baseType = match[1];
    const count = parseInt(match[2] || String(value.length));
    if (count != value.length) {
      logger.throwArgumentError(
        `invalid array length for ${type}`,
        'value',
        value,
      );
    }
    const result: Array<Uint8Array> = [];
    value.forEach(function (value) {
      result.push(_pack(baseType, value, true));
    });
    return concat(result);
  }

  return logger.throwArgumentError('invalid type', 'type', type);
}

/**
 * Converts arrays with types and values into a hex string that can be hashed
 *
 * @param types array of Solidity types, where `type[0]` is the type for `value[0]`
 * @param values array of values, where `value[0]` is of type `type[0]`
 * @returns a hex string with the data given, packed to include its types
 * @example
 * ```javascript
 * const types = ['bool', 'string', 'uint64'];
 * const values = [true, 'text', 30];
 * pack(types, values);
 * // '0x0174657874000000000000001e'
 * ```
 */
export function pack(types: ReadonlyArray<string>, values: ReadonlyArray<any>) {
  if (types.length != values.length) {
    logger.throwArgumentError(
      'wrong number of values; expected ${ types.length }',
      'values',
      values,
    );
  }
  const tight: Array<Uint8Array> = [];
  types.forEach(function (type, index) {
    tight.push(_pack(type, values[index]));
  });
  return hexlify(concat(tight));
}

/**
 * Hashes data from Solidity using the Keccak256 algorithm.
 *
 * Similar to ["solidityKeccak256" in ethers.js](https://docs.ethers.io/v5/api/utils/hashing/#utils-solidityKeccak256)
 *
 * @param types Each [Solidity type](https://docs.soliditylang.org/en/v0.8.13/types.html) corresponding to the values passed in. Helps the function parse and pack data properly.
 * @param values Data to be concatenated (combined) and then hashed.
 * @returns A Keccak256 hash (hex string) based on the values provided
 * @example
 * ```javascript
 * const types = ['string', 'bool', 'uint32'];
 * const values = ['essential-eth is great', true, 14];
 * solidityKeccak256(types, values);
 * // '0xe4d4c8e809faac09d58f468f0aeab9474fe8965d554c6c0f868c433c3fd6acab'
 * ```
 * @example
 * ```javascript
 * const types = ['bytes4', 'uint32[5]'];
 * const values = [[116, 101, 115, 116], [5, 3, 4, 9, 18]];
 * solidityKeccak256(types, values);
 * // '0x038707a887f09355dc545412b058e7ba8f3c74047050c7c5e5e52eec608053d9'
 * ```
 */
export function solidityKeccak256(
  types: ReadonlyArray<string>,
  values: ReadonlyArray<any>,
): string {
  return keccak256(pack(types, values));
}
