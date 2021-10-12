import { cleanBlock } from '../classes/utils/clean-block';
import { buildRPCPostBody, post } from '../classes/utils/fetchers';
import { Block, RPCBlock } from '../types/block.types';
export class JsonRpcProvider {
  /**
   * The URL to your Eth node. Consider POKT or Infura
   */
  _rpcUrl: string;
  constructor(rpcUrl?: string) {
    this._rpcUrl = rpcUrl || 'https://free-eth-node.com/api/eth';
  }

  /**
   * Returns the block requested
   * Same as `web3.eth.getBlock`
   */
  public async getBlock(
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
    const nodeResponse = (await post(
      this._rpcUrl,
      buildRPCPostBody('eth_getBlockByNumber', [
        rpcTimeFrame,
        returnTransactionObjects,
      ]),
    )) as RPCBlock;

    return cleanBlock(nodeResponse, returnTransactionObjects);
  }
}

/**
 * Helper function to avoid "new"
 */
export function jsonRpcProvider(rpcUrl?: string) {
  return new JsonRpcProvider(rpcUrl);
}
