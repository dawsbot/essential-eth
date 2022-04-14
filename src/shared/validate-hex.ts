import { validateType } from './validate-type';

export function validateHex(data: string | number): string {
  validateType(data, ['string', 'number']);
  if (typeof data === 'string') {
    if (!data.startsWith('0x') || data.length % 2)
      throw new Error(
        `Expected a hex string or number (in any format). Consider prepending this string with '0x' to indicate a hex string. Received value: ${data}`,
      );
    else return data;
  }
  return `0x${data.toString(16)}`;
}
