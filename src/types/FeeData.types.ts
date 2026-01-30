export interface FeeData {
  gasPrice: bigint;
  lastBaseFeePerGas: bigint | null;
  maxFeePerGas: bigint | null;
  maxPriorityFeePerGas: bigint | null;
}
