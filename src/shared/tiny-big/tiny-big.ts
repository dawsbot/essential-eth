import Big from "big.js";
import { scientificStrToDecimalStr } from "./helpers";

// https://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript/1685917
export const stripScientificNotation = (num: number) =>
  num.toLocaleString("fullwide", { useGrouping: false });

export class TinyBig {
  __value: Big;
  constructor(value: number | string) {
    this.__value = Big(value);
    // return this;
  }
  toNumber(): number {
    return Number(stripScientificNotation(this.__value.toNumber()));
  }

  toString(): string {
    // return this.__value.toString();
    return scientificStrToDecimalStr(this.__value.toString());
  }
}
// export class TinyBig {
//   __value: string;
//   constructor(value: number | string) {
//     this.__value = String(value);
//     // return this;
//   }
//   toNumber(): number {
//     return Number(stripScientificNotation(Number(this.__value)));
//   }

//   toString(): string {
//     return stripScientificNotation(Number(this.__value));
//   }
// }

export function tinyBig(value: number | string): TinyBig {
  return new TinyBig(value);
}
