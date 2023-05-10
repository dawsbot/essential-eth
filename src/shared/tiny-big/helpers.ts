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
 */
function stripTrailingZeroes(numberString: string) {
  const isNegative = numberString.startsWith('-');
  numberString = numberString.replace('-', '');

  numberString = numberString.replace(
    /\.0*$/g,
    '' /* for numbers like "1.0" -> "1" */,
  );
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

/**
 * Converts a string in scientific notation formatting to string in decimal format
 *
 * @param scientificString a string in scientific format to convert to decimal
 * @returns a string of a decimal number equivalent to the specified scientificString
 * @example
 * ```javascript
 * scientificStrToDecimalStr('2.3e-5');
 * // '0.000023'
 * ```
 * @example
 * ```javascript
 * scientificStrToDecimalStr('2.3e+5');
 * // '230000'
 * ```
 */
export function scientificStrToDecimalStr(scientificString: string): string {
  // Does not contain "e" nor "E"
  if (!scientificString.match(/e/i /* lowercase and uppercase E */)) {
    return stripTrailingZeroes(scientificString);
  }

  // eslint-disable-next-line prefer-const
  let [base, power] = scientificString.split(
    /e/i /* lowercase and uppercase E */,
  );

  // remove the leading "-" if negative
  const isNegative = Number(base) < 0;
  base = base.replace('-', '');

  base = stripTrailingZeroes(base);
  const [wholeNumber, fraction /* move decimal this many places */ = ''] =
    base.split('.');
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
        base = base.padStart(
          baseLength + Math.abs(Number(power)) - wholeNumber.length,
          '0',
        );
      }
      splitPaddedNumber = base.split('');
      if (wholeNumber.length < Math.abs(Number(power))) {
        // starts with zeroes
        splitPaddedNumber = ['.', ...splitPaddedNumber];
      } else {
        splitPaddedNumber.splice(
          splitPaddedNumber.length - Math.abs(Number(power)),
          0,
          '.',
        );
      }
    } else {
      // move decimal right
      if (fraction.length < Math.abs(Number(power))) {
        base = base.padEnd(
          baseLength + Math.abs(Number(power)) - fraction.length,
          '0',
        );
      }
      splitPaddedNumber = base.split('');
      if (fraction.length > Math.abs(Number(power))) {
        splitPaddedNumber.splice(
          splitPaddedNumber.length - Math.abs(Number(power)),
          0,
          '.',
        );
      }
    }
    const toReturn = stripTrailingZeroes(splitPaddedNumber.join(''));
    return `${isNegative ? '-' : ''}${toReturn}`;
  }
}
