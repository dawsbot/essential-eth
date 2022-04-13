import Big from 'big.js';
import { scientificStrToDecimalStr } from './helpers';

/**
 * A wrapper around big.js which expands scientific notation and creates a "toHexString" function.
 * This is the return type of every operation on ether, wei, etc.
 */
export class TinyBig extends Big {
  constructor(value: string | number | TinyBig | Big) {
    try {
      super(value);
    } catch (e) {
      console.error(`TinyBig cannot parse value (value=${value})`);
      throw e;
    }
  }
  /**
   * Used anytime you're passing in "value" to ethers or web3
   * For now, TypeScript will complain that `TinyBig` is not a `BigNumberish`. You can // @ts-ignore or call this
   */
  toHexString(): string {
    return `0x${BigInt(this.toString()).toString(16)}`;
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
 *
 * @example
 * ```javascript
 * tinyBig(10).times(3).toNumber()
 * // 30
 * ```
 */
export function tinyBig(value: string | number | TinyBig | Big): TinyBig {
  return new TinyBig(value);
}
