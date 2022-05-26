import { BlockTag } from './Block.types';

export interface EventFilter {
  address?: string;
  topics?: Array<string | Array<string> | null>;
}

/**
 * @param fromBlock block as starting point for range, inclusive
 *
 * @param toBlock block as ending point for range, inclusive
 */
export interface Filter extends EventFilter {
  fromBlock?: BlockTag;
  toBlock?: BlockTag;
}

export interface FilterByBlockHash extends EventFilter {
  blockHash?: string;
}
