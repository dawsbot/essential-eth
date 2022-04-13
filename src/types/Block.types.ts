import { RPCTransaction } from './Transaction.types';

type Modify<T, R> = Omit<T, keyof R> & R;
export type Block = Modify<
  RPCBlock,
  {
    gasLimit: number;
    gasUsed: number;
    number: number;
    size: number;
    timestamp: number;
    baseFeePerGas: number;
  }
>;

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
  transactions: Array<string | RPCTransaction /* if second arg is true */>;
  transactionsRoot: string;
  uncles: unknown[];
}

export type BlockTag =
  | 'latest'
  | 'earliest'
  | 'pending'
  | number
  | string; /* block number as hex string '0x0' */
