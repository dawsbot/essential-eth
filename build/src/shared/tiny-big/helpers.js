/**
 * Strips both leading and trailing zeroes from a number string
 *
 * @param numberString the string of numbers to strip zeros from
 * @returns a string of numbers without leading or trailing zeros
 * @example
 * ```javascript
 * stripTrailingZeros('0005280');
 * // '5280'
 * ```
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "scientificStrToDecimalStr", {
    enumerable: true,
    get: ()=>scientificStrToDecimalStr
});
function stripTrailingZeroes(numberString) {
    const isNegative = numberString.startsWith('-');
    numberString = numberString.replace('-', '');
    numberString = numberString.replace(/\.0*$/g, '' /* for numbers like "1.0" -> "1" */ );
    numberString = numberString.replace(/^0+/, '');
    // for numbers like "1.10" -> "1.1"
    if (numberString.includes('.')) {
        numberString = numberString.replace(/0+$/, '');
    }
    if (numberString.startsWith('.')) {
        // so that ".1" returns as "0.1"
        numberString = `0${numberString}`;
    }
    return `${isNegative ? '-' : ''}${numberString}`;
}
function scientificStrToDecimalStr(scientificString) {
    // Does not contain "e" nor "E"
    if (!scientificString.match(/e/i /* lowercase and uppercase E */ )) {
        return stripTrailingZeroes(scientificString);
    }
    // eslint-disable-next-line prefer-const
    let [base, power] = scientificString.split(/e/i /* lowercase and uppercase E */ );
    // remove the leading "-" if negative
    const isNegative = Number(base) < 0;
    base = base.replace('-', '');
    base = stripTrailingZeroes(base);
    const [wholeNumber, fraction /* move decimal this many places */  = ''] = base.split('.');
    if (Number(power) === 0) {
        return `${isNegative ? '-' : ''}${stripTrailingZeroes(base)}`;
    } else {
        const includesDecimal = base.includes('.');
        if (!includesDecimal) {
            base = `${base}.`;
        }
        base = base.replace('.', '');
        const baseLength = base.length;
        let splitPaddedNumber;
        if (Number(power) < 0) {
            // move decimal left
            if (wholeNumber.length < Math.abs(Number(power))) {
                base = base.padStart(baseLength + Math.abs(Number(power)) - wholeNumber.length, '0');
            }
            splitPaddedNumber = base.split('');
            if (wholeNumber.length < Math.abs(Number(power))) {
                // starts with zeroes
                splitPaddedNumber = [
                    '.',
                    ...splitPaddedNumber
                ];
            } else {
                splitPaddedNumber.splice(splitPaddedNumber.length - Math.abs(Number(power)), 0, '.');
            }
        } else {
            // move decimal right
            if (fraction.length < Math.abs(Number(power))) {
                base = base.padEnd(baseLength + Math.abs(Number(power)) - fraction.length, '0');
            }
            splitPaddedNumber = base.split('');
            if (fraction.length > Math.abs(Number(power))) {
                splitPaddedNumber.splice(splitPaddedNumber.length - Math.abs(Number(power)), 0, '.');
            }
        }
        const toReturn = stripTrailingZeroes(splitPaddedNumber.join(''));
        return `${isNegative ? '-' : ''}${toReturn}`;
    }
}
