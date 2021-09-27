import Big from 'big.js';
import { scientificStrToDecimalStr } from './helpers';

/**
 * A wrapper around big.js which expands scientific notation. This is the return type of every operation on ether, wei, etc.
 * The only important things to know are the "toString" and "toNumber" functions
 */
export class TinyBig extends Big {
  constructor(value: number | string | TinyBig) {
    super(value);
  }
  toNumber(): number {
    return Number(scientificStrToDecimalStr(super.toString()));
  }

  toString(): string {
    if (this.toNumber() === 0) {
      return '0';
    }
    return scientificStrToDecimalStr(super.toString());
  }
}

/**
 * Helper factory function so that you don't have to type "new" when instantiating a new TinyBig
 */
export function tinyBig(value: number | string | TinyBig): TinyBig {
  return new TinyBig(value);
}
