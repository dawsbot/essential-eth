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
    TinyBig: ()=>TinyBig,
    tinyBig: ()=>tinyBig
});
const _bigJs = /*#__PURE__*/ _interopRequireDefault(require("big.js"));
const _hexToDecimal = require("../../classes/utils/hex-to-decimal");
const _helpers = require("./helpers");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class TinyBig extends _bigJs.default {
    /**
   * Used anytime you're passing in "value" to ethers or web3
   * For now, TypeScript will complain that `TinyBig` is not a `BigNumberish`. You can // @ts-ignore or call this
   *
   * @returns the TinyBig represented as a hex string
   * @example
   * ```javascript
   * tinyBig(293).toHexString();
   * // '0x125'
   * ```
   * @example
   * ```javascript
   * tinyBig(681365874).toHexString();
   * // '0x289cd172'
   */ toHexString() {
        return `0x${BigInt(this.toString()).toString(16)}`;
    }
    toNumber() {
        return Number((0, _helpers.scientificStrToDecimalStr)(super.toString()));
    }
    toString() {
        if (this.toNumber() === 0) {
            return '0';
        }
        return (0, _helpers.scientificStrToDecimalStr)(super.toString());
    }
    toTwos(bitCount) {
        let binaryStr;
        if (this.gte(0)) {
            const twosComp = this.toNumber().toString(2);
            binaryStr = this.padAndChop(twosComp, '0', bitCount || twosComp.length);
        } else {
            binaryStr = this.plus(Math.pow(2, bitCount)).toNumber().toString(2);
            if (Number(binaryStr) < 0) {
                throw new Error('Cannot calculate twos complement');
            }
        }
        const binary = `0b${binaryStr}`;
        const decimal = Number(binary);
        return tinyBig(decimal);
    }
    constructor(value){
        if (typeof value === 'string' && value.startsWith('0x')) {
            value = (0, _hexToDecimal.hexToDecimal)(value);
        }
        super(value);
        /**
   * Eithers pads or shortens a string to a specified length
   *
   * @param str the string to pad or chop
   * @param padChar the character to pad the string with
   * @param length the desired length of the given string
   * @returns a string of the desired length, either padded with the specified padChar or with the beginning of the string chopped off
   * @example
   * ```javascript
   * padAndChop('essential-eth', 'a', 8);
   * // 'tial-eth'
   * ```
   * @example
   * ```javascript
   * padAndChop('essential-eth', 'A', 20);
   * // 'AAAAAAAessential-eth'
   * ```
   */ this.padAndChop = (str, padChar, length)=>{
            return (Array(length).fill(padChar).join('') + str).slice(length * -1);
        };
    }
}
function tinyBig(value) {
    return new TinyBig(value);
}
