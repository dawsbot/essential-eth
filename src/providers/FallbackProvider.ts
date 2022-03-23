import { cleanBlock } from '../classes/utils/clean-block';
import { buildRPCPostBody, post } from '../classes/utils/fetchers';
import { hexToDecimal } from '../classes/utils/hex-to-decimal';
import { Block, RPCBlock } from '../types/Block.types';
import { Network } from '../types/Network.types';
import { JsonRpcProvider } from './JsonRpcProvider';
import chainsInfo from './utils/chains-info';
export class FallbackProvider {
  /**
   * The URL to your Eth node. Consider POKT or Infura
   */
  _rpcUrls: Array<string>;
  constructor(rpcUrls?: Array<string>) {
    this._rpcUrls = rpcUrls || [
      'https://free-eth-junk.com/api/eth',
      'https://free-eth-node.com/api/eth',
    ];
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
    const firstCall = new JsonRpcProvider(this._rpcUrls[0]);
    return firstCall.getBlock('latest').catch((e) => {
      const secondCall = new JsonRpcProvider(this._rpcUrls[1]);
      return secondCall.getBlock('latest');
    });
  }
}
/**
 * Helper function to avoid "new"
 */
export function jsonRpcProvider(rpcUrl?: string) {
  return new JsonRpcProvider(rpcUrl);
}
