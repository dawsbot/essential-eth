import { RPCTransaction, Transaction } from './Transaction.types';

export interface Block {
  baseFeePerGas: string;
  difficulty: number;
  extraData: string;
  gasLimit: number;
  gasUsed: number;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: number;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: number;
  stateRoot: string;
  timestamp: number;
  totalDifficulty: number;
  transactions: string[] | Transaction[];
  transactionsRoot: string;
  uncles: unknown[];
}
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
  transactions:
    | Array<string>
    | Array<RPCTransaction> /* if second arg is true */;
  transactionsRoot: string;
  uncles: unknown[];
}

export type BlockTag =
  | 'latest'
  | 'earliest'
  | 'pending'
  | number
  | string; /* block number as hex string '0x0' */
