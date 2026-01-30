/**
 * Converts a decimal string to a bigint with the specified number of decimals.
 * e.g. parseFixed("1.5", 18) => 1500000000000000000n
 *
 * @param value the decimal string to parse
 * @param decimals the number of decimal places
 * @returns a bigint representing the fixed-point value
 */
export function parseFixed(value: string, decimals: number): bigint {
  let negative = false;
  if (value.startsWith('-')) {
    negative = true;
    value = value.substring(1);
  }

  if (value === '') {
    throw new Error('invalid decimal value');
  }

  // Split into integer and fractional parts
  const parts = value.split('.');
  if (parts.length > 2) {
    throw new Error('too many decimal points');
  }

  const integer = parts[0] || '0';
  let fraction = parts[1] || '';

  // Truncate fraction if longer than decimals
  if (fraction.length > decimals) {
    const extra = fraction.substring(decimals);
    if (extra.match(/[^0]/)) {
      throw new Error('fractional component exceeds decimals');
    }
    fraction = fraction.substring(0, decimals);
  }

  // Pad fraction to full length
  while (fraction.length < decimals) {
    fraction += '0';
  }

  const result = BigInt(integer + fraction);
  return negative ? -result : result;
}

/**
 * Converts a bigint to a decimal string with the specified number of decimals.
 * e.g. formatFixed(1500000000000000000n, 18) => "1.5"
 *
 * @param value the bigint to format
 * @param decimals the number of decimal places
 * @returns a decimal string representation
 */
export function formatFixed(value: bigint, decimals: number): string {
  let negative = '';
  if (value < 0n) {
    negative = '-';
    value = -value;
  }

  let str = value.toString();

  // Pad with leading zeros if necessary
  while (str.length <= decimals) {
    str = '0' + str;
  }

  const integerPart = str.substring(0, str.length - decimals);
  const fractionPart = str.substring(str.length - decimals);

  // Remove trailing zeros from fraction
  const trimmedFraction = fractionPart.replace(/0+$/, '');

  if (trimmedFraction) {
    return `${negative}${integerPart}.${trimmedFraction}`;
  }
  return `${negative}${integerPart}`;
}

/**
 * Converts various types to bigint.
 *
 * @param value the value to convert
 * @returns a bigint representation
 */
export function toBigInt(value: string | number | bigint): bigint {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'string') {
    if (value.startsWith('0x')) {
      return BigInt(value);
    }
    // Handle decimal strings - take only the integer part
    if (value.includes('.')) {
      return BigInt(value.split('.')[0] || '0');
    }
    return BigInt(value);
  }
  return BigInt(value);
}
