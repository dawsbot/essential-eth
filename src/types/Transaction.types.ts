type Modify<T, R> = Omit<T, keyof R> & R;
// exact type returned from JSON RPC
export type TransactionResponse = Modify<
  RPCTransaction,
  {
    a: true;
  }
>;
//   blockHash: string;
//   blockNumber: number;
//   chainId?: number;
//   from: string;
//   gas: number;
//   gasPrice: string;
//   hash: string;
//   input: string;
//   nonce: number;
//   r: string;
//   s: string;
//   to: string;
//   transactionIndex: number;
//   type: number;
//   v: number;
//   value: string;
//   maxFeePerGas?: any;
//   maxPriorityFeePerGas?: any;
// }

export interface RPCTransaction {
  blockHash: string;
  blockNumber: string;
  chainId: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  r: string;
  s: string;
  to: string;
  transactionIndex: string;
  type: string;
  v: string;
  value: string;
}
