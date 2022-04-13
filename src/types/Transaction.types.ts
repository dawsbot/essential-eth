import { TinyBig } from '../shared/tiny-big/tiny-big';

type Modify<T, R> = Omit<T, keyof R> & R;
export interface RPCTransaction extends RPCBlockTransaction {
  // not in getBlock transactions, only in getTransaction response

  maxFeePerGas: string /* "0xfc21e1832", */;
  maxPriorityFeePerGas: string /* "0x59682f00" */;
}
// exact type returned from JSON RPC
export type TransactionResponse = Modify<
  RPCTransaction,
  {
    blockNumber: number;
    chainId: number;
    nonce: number;
    transactionIndex: number;
    type: number;
    v: number;
    value: TinyBig;
    gasPrice: TinyBig;
    gas: TinyBig;
    gasLimit: TinyBig;
  } & {
    maxFeePerGas: TinyBig;
    maxPriorityFeePerGas: TinyBig;
    confirmations: number;
  }
>;
export type BlockTransactionResponse = Omit<
  TransactionResponse,
  'maxFeePerGas' | 'maxPriorityFeePerGas'
>;

/** What JSONRPC responds with in getBlock transaction array */
export interface RPCBlockTransaction {
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
