import { BlockTag } from './Block.types';

export interface EventFilter {
  address?: string;
  topics?: Array<string | Array<string> | null>;
}

export interface Filter extends EventFilter {
  fromBlock?: BlockTag;
  toBlock?: BlockTag;
}

export interface FilterByBlockHash extends EventFilter {
  blockHash?: string;
}
