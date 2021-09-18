import { Block, RPCBlock } from '../types/block.types';
import { cleanBlock } from './utils/clean-block';
import { buildRPCPostBody, post } from './utils/fetchers';
export class EssentialEth {
  /**
   * The URL to your Eth node. Consider POKT or Infura
   */
  private _rpcUrl: string;
  constructor(rpcUrl: string) {
    if (!rpcUrl) {
      throw new Error(
        'rpc required to initialize essential-eth. Consider POKT or Infura',
      );
    }
    this._rpcUrl = rpcUrl;
  }

  /**
   * Returns the block requested
   */
  async getBlock(
    timeFrame:
      | 'latest'
      | 'earliest'
      | 'pending'
      | number /* block number as integer */,
    returnTransactionObjects = false,
  ): Promise<Block> {
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
      buildRPCPostBody('eth_getBlockByNumber', [
        rpcTimeFrame,
        returnTransactionObjects,
      ]),
    ).then((data) => data.result as RPCBlock);

    return cleanBlock(nodeResponse, returnTransactionObjects);
  }
}
