import { cleanBlock } from '../classes/utils/clean-block';
import { buildRPCPostBody, post } from '../classes/utils/fetchers';
import { hexToDecimal } from '../classes/utils/hex-to-decimal';
import { Block, RPCBlock } from '../types/Block.types';
import { Network } from '../types/Network.types';
import chainsInfo from './utils/chains-info';
export class JsonRpcProvider {
  /**
   * The URL to your Eth node. Consider POKT or Infura
   */
  readonly _rpcUrl: Array<string>;
  _rpcUrlCounter: number;
  constructor(rpcUrl?: string | Array<string>) {
    this._rpcUrl = ((): Array<string> => {
      if (!rpcUrl) {
        return ['https://free-eth-node.com/api/eth'];
      } else if (!Array.isArray(rpcUrl)) {
        return [rpcUrl];
      }
      return rpcUrl;
    })();
    this._rpcUrlCounter = 0;
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
    const req = async (): Promise<RPCBlock> => {
      return await post(
        this._rpcUrl[this._rpcUrlCounter],
        buildRPCPostBody('eth_getBlockByNumber', [
          rpcTimeFrame,
          returnTransactionObjects,
        ]),
      ).catch((e) => {
        if (e.code === 'ENOTFOUND') {
          this._rpcUrlCounter++;
          return req();
        }
        throw e;
      });
    };
    const nodeResponse = (await req()) as RPCBlock;

    return cleanBlock(nodeResponse, returnTransactionObjects);
  }
  /**
   * Returns the network this provider is connected to
   */
  public async getNetwork(): Promise<Network> {
    const req = async (): Promise<string> => {
      return await post(
        this._rpcUrl[this._rpcUrlCounter],
        buildRPCPostBody('eth_chainId', []),
      ).catch((e) => {
        if (e.code === 'ENOTFOUND') {
          this._rpcUrlCounter++;
          return req();
        }
        throw e;
      });
    };
    const nodeResponse = (await req()) as string;
    const chainId = hexToDecimal(nodeResponse);
    const info = (chainsInfo as any)[chainId];
    return {
      chainId: Number(chainId),
      name: info[0] || 'unknown',
      ensAddress: info[1] || null, // only send ensAddress if it exists
    };
  }
}

/**
 * Helper function to avoid "new"
 */
export function jsonRpcProvider(rpcUrl?: string) {
  return new JsonRpcProvider(rpcUrl);
}
