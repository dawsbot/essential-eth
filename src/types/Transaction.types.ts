import type Big from 'big.js';
import { TinyBig } from '../shared/tiny-big/tiny-big';
import { BytesLike } from './../utils/bytes';

type Modify<T, R> = Omit<T, keyof R> & R;

export interface RPCTransaction extends RPCBlockTransaction {
  // not in getBlock transactions, only in getTransaction response
  maxFeePerGas: string /* "0xfc21e1832", */;
  maxPriorityFeePerGas: string /* "0x59682f00" */;
}

export type TransactionResponse = Modify<
  RPCTransaction,
  {
    blockNumber: number;
    chainId: number;
    gas: TinyBig;
    gasLimit: TinyBig;
    gasPrice: TinyBig;
    nonce: TinyBig;
    transactionIndex: number;
    type: number;
    v: number;
    value: TinyBig;
  } & {
    maxFeePerGas: TinyBig;
    maxPriorityFeePerGas: TinyBig;
    confirmations: number;
  }
>;

/**
 * Type that contains information from the receipt of a transaction
 *
 * * Similar to [`Type TransactionReceipt on ethers.providers`](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt)
 */
export type TransactionReceipt = Modify<
  RPCTransactionReceipt,
  {
    blockNumber: number;
    cumulativeGasUsed: TinyBig;
    effectiveGasPrice: TinyBig;
    gasUsed: TinyBig;
    logs: Array<Log>;
    status: number;
    transactionIndex: number;
    type: number;
  } & {
    byzantium: boolean;
    confirmations: number;
  }
>;

// What the RPC is expecting
export interface RPCTransactionRequest {
  from?: string;
  to: string;
  gas?: string;
  gasPrice?: string;
  value?: string;
  data?: BytesLike;
  nonce?: string /* hex number as string */;
  maxPriorityFeePerGas?: string /* hex number as string */;
  maxFeePerGas?: string /* hex number as string */;
}

export interface TransactionRequest {
  to?: string;
  from?: string;
  nonce?: TinyBig | string | Big;
  gas?: TinyBig | number | Big;
  gasPrice?: TinyBig | number | Big;
  data?: BytesLike;
  value?: TinyBig | string | Big | number;
  chainId?: number;
  type?: number;
  maxPriorityFeePerGas?: TinyBig | string | Big;
  maxFeePerGas?: TinyBig | string | Big;
}

/**
 * Type for the logs that are included in transaction receipts
 * Similar to [`Type Log on ethers.providers`](https://docs.ethers.io/v5/api/providers/types/#providers-Log)
 */
export type Log = Modify<
  RPCLog,
  {
    blockNumber: number;
    logIndex: number;
    transactionIndex: number;
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

export interface RPCTransactionReceipt {
  blockHash: string;
  blockNumber: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  from: string;
  gasUsed: string;
  logs: Array<RPCLog>;
  logsBloom: string;
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: string;
  type: string;
}

export interface RPCLog {
  address: string;
  blockHash: string;
  blockNumber: string;
  data: string;
  logIndex: string;
  removed?: boolean;
  topics: Array<string>;
  transactionHash: string;
  transactionIndex: string;
}
