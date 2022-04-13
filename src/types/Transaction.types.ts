type Modify<T, R> = Omit<T, keyof R> & R;
// exact type returned from JSON RPC
export type TransactionResponse = Modify<
  RPCTransaction,
  {
    blockNumber: number;
    chainId: number;
    gas: number;
    nonce: number;
    transactionIndex: number;
    type: number;
  }
>;

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
