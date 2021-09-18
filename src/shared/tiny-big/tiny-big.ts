import Big from 'big.js';
import { scientificStrToDecimalStr } from './helpers';

/**
 * A wrapper around big.js which expands scientific notation. This is the return type of every operation on ether, wei, etc.
 * The only important things to know are the "toString" and "toNumber" functions
 */
export class TinyBig extends Big {
  // TODO: replace usage of big.js with a custom and more minimal function
  // __value: Big;
  constructor(value: number | string) {
    super(value);
    // this
    // this.__value = Big(value);
  }
  toNumber(): number {
    return Number(scientificStrToDecimalStr(super.toString()));
    // return Number(scientificStrToDecimalStr(this.__value.toString()));
  }

  toString(): string {
    if (this.toNumber() === 0) {
      return '0';
    }
    return scientificStrToDecimalStr(super.toString());
  }
}

export function tinyBig(value: number | string): TinyBig {
  return new TinyBig(value);
}
