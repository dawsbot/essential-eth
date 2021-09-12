import Big from "big.js";
import { scientificStrToDecimalStr } from "./helpers";

// https://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript/1685917
export const stripScientificNotation = (num: number) =>
  num.toLocaleString("fullwide", { useGrouping: false });

export class TinyBig {
  // TODO: replace usage of big.js with a custom and more minimal function
  __value: Big;
  constructor(value: number | string) {
    this.__value = Big(value);
  }
  toNumber(): number {
    return Number(stripScientificNotation(this.__value.toNumber()));
  }

  toString(): string {
    return scientificStrToDecimalStr(this.__value.toString());
  }
}

export function tinyBig(value: number | string): TinyBig {
  return new TinyBig(value);
}
