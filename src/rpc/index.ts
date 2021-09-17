import unfetch from 'isomorphic-unfetch';
import { tinyBig } from '..';
import { toChecksumAddress } from '../to-checksum-address';
function buildRPCPostBody(...params: any[]) {
  return {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_getBlockByNumber',
    params,
  };
}
function post(url: string, body: Record<string, unknown>) {
  return unfetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((r) => r.json());
}
export class EssentialEth {
  _rpcUrl: string;
  constructor(rpcUrl: string) {
    if (!rpcUrl) {
      throw new Error(
        'rpc required to initialize essential-eth. Consider POKT or Infura',
      );
    }
    this._rpcUrl = rpcUrl;
  }
  async getBlock(
    timeFrame:
      | 'latest'
      | 'earliest'
      | 'pending'
      | number /* block number as integer */,
    returnTransactionObjects = false,
  ) {
    let rpcTimeFrame: string;
    if (typeof timeFrame === 'number') {
      // exact block numbers require hex string format
      rpcTimeFrame = `0x${timeFrame.toString(16)}`;
    } else {
      // "latest", "earliest", and "pending" require no manipulation
      rpcTimeFrame = timeFrame;
    }
    const nodeResponse = await post(
      this._rpcUrl,
      buildRPCPostBody(rpcTimeFrame, returnTransactionObjects),
    ).then((data) => data.result as RPCBlock);

    return cleanBlock(nodeResponse, returnTransactionObjects);
  }
}

/**
 * Converts hex to decimal and checksum-addresses all addresses
 */
function cleanBlock(block: RPCBlock, returnTransactionObjects: boolean): Block {
  const cleanedBlock: any = { ...block };
  (Object.keys(block) as Array<keyof RPCBlock>).forEach((key) => {
    // pending blocks have null instead of a difficulty
    // pending blocks have null instead of a miner address
    if (!block[key]) return;
    switch (key) {
      case 'gasLimit':
      case 'gasUsed':
      case 'number':
      case 'size':
      case 'timestamp':
        cleanedBlock[key] = parseInt(block[key], 16);
        break;
      case 'difficulty':
      case 'totalDifficulty':
        cleanedBlock[key] = tinyBig(parseInt(block[key], 16)).toString();
        break;
      case 'miner':
        if (block[key]) {
          cleanedBlock[key] = toChecksumAddress(block[key]);
        }
        break;
    }
  });
  // for all full transactions
  if (returnTransactionObjects) {
    (block.transactions as RPCTransaction[]).forEach((transaction, index) => {
      const cleanedTransaction: any = { ...transaction };
      (Object.keys(transaction) as Array<keyof RPCTransaction>).forEach(
        (key) => {
          // pending blocks have null instead of a difficulty
          // pending blocks have null instead of a miner address
          if (!transaction[key]) return;
          switch (key) {
            case 'blockNumber':
            case 'gas':
            case 'nonce':
            case 'transactionIndex':
            case 'type':
              cleanedTransaction[key] = parseInt(transaction[key], 16);
              break;
            case 'gasPrice':
            case 'value':
              cleanedTransaction[key] = tinyBig(
                parseInt(transaction[key], 16),
              ).toString();
              break;
            case 'from':
            case 'to':
              if (transaction[key]) {
                cleanedTransaction[key] = toChecksumAddress(transaction[key]);
              }
              break;
          }
        },
      );
      block.transactions[index] = cleanedTransaction;
    });
  }
  return cleanedBlock;
}

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
  transactions: string[];
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

export interface RPCTransaction {
  blockHash: string;
  blockNumber: string;
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
