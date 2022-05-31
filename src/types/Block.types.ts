import { TinyBig } from './../shared/tiny-big/tiny-big';
import { BlockTransactionResponse } from './Transaction.types';

type Modify<T, R> = Omit<T, keyof R> & R;

export type BlockResponse = Modify<
  RPCBlock,
  {
    baseFeePerGas: TinyBig;
    difficulty: TinyBig;
    gasLimit: TinyBig;
    gasUsed: TinyBig;
    nonce: TinyBig;
    number: number;
    size: TinyBig;
    timestamp: TinyBig;
    totalDifficulty: TinyBig;
    transactions: Array<BlockTransactionResponse>;
  }
>;

/** Exact response from backend */
export interface RPCBlock {
  baseFeePerGas: string;
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactions: Array<string>;
  transactionsRoot: string;
  uncles: Array<string>;
}

export type BlockTag =
  | 'latest'
  | 'earliest'
  | 'pending'
  | number
  | string; /* block number as hex string '0x0' */
