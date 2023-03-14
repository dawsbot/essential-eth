import type { TinyBig } from '../shared/tiny-big/tiny-big';

export interface FeeData {
  gasPrice: TinyBig;
  lastBaseFeePerGas: TinyBig | null;
  maxFeePerGas: TinyBig | null;
  maxPriorityFeePerGas: TinyBig | null;
}
