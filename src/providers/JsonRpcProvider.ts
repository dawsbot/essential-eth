import { cleanBlock } from '../classes/utils/clean-block';
import { cleanTransaction } from '../classes/utils/clean-transaction';
import { buildRPCPostBody, post } from '../classes/utils/fetchers';
import { hexToDecimal } from '../classes/utils/hex-to-decimal';
import { TinyBig, tinyBig } from '../shared/tiny-big/tiny-big';
import { Block, BlockTag, RPCBlock } from '../types/Block.types';
import { Network } from '../types/Network.types';
import {
  RPCTransaction,
  TransactionResponse,
} from '../types/Transaction.types';
import chainsInfo from './utils/chains-info';
export class JsonRpcProvider {
  /**
   * @ignore
   */
  readonly _rpcUrl: string;
  /**
   * @param rpcUrl The URL to your Eth node. Consider POKT or Infura
   */
  constructor(rpcUrl?: string) {
    this._rpcUrl = rpcUrl || 'https://free-eth-node.com/api/eth';
  }

  /**
   * Returns the block requested
   * Same as `web3.eth.getBlock`
   */
  public async getBlock(
    timeFrame: BlockTag,
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
    const req = (): Promise<RPCBlock> => {
      return post(
        this._rpcUrl,
        buildRPCPostBody('eth_getBlockByNumber', [
          rpcTimeFrame,
          returnTransactionObjects,
        ]),
      );
    };
    const nodeResponse = (await req()) as RPCBlock;

    return cleanBlock(nodeResponse, returnTransactionObjects);
  }
  /**
   * Returns the network this provider is connected to
   */
  public async getNetwork(): Promise<Network> {
    const req = (): Promise<string> => {
      return post(this._rpcUrl, buildRPCPostBody('eth_chainId', []));
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
  /**
   * Returns the current gas price in wei as TinyBig
   * Same as `ethers.provider.getGasPrice`
   */
  public async getGasPrice(): Promise<TinyBig> {
    const req = (): Promise<string> => {
      return post(this._rpcUrl, buildRPCPostBody('eth_gasPrice', []));
    };
    const nodeResponse = (await req()) as string; /* '0x153cfb1ad0' */
    return tinyBig(hexToDecimal(nodeResponse));
  }

  /**
   * Returns the balance of the account in wei as TinyBig
   * Same as `ethers.provider.getBalance`
   * Same as `web3.eth.getBalance`
   *
   * @example
   * ```js
   *  await provider
   *   .getBalance('0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8')
   *   .then((balance) => console.log(balance.toString()));
   * // "28798127851528138"
   * ```
   */
  public async getBalance(
    address: string,
    blockTag: BlockTag = 'latest',
  ): Promise<TinyBig> {
    const req = (): Promise<string> => {
      return post(
        this._rpcUrl,
        buildRPCPostBody('eth_getBalance', [address, blockTag]),
      );
    };
    const nodeResponse = (await req()) as string; /* '0x153cfb1ad0' */
    return tinyBig(hexToDecimal(nodeResponse));
  }
  /**
   * Returns information about a specified transaction
   * Includes additional information than what is included in the Transaction type
   * Similar to `ethers.provider.getTransaction`, some information not included
   */
  public async getTransaction(hash: string): Promise<TransactionResponse> {
    const req = async (): Promise<RPCTransaction> => {
      return await post(
        this._rpcUrl,
        buildRPCPostBody('eth_getTransactionByHash', [hash]),
      );
    };
    const nodeResponse = (await req()) as RPCTransaction;
    return cleanTransaction(nodeResponse);
  }
}

/**
 * Helper function to avoid "new"
 *
 * @example
 * ```javascript
 * jsonRpcProvider().getBlock('latest').then(block => {
 *   console.log(block.number);
 * })
 * // 14530496
 * ```
 */
export function jsonRpcProvider(rpcUrl?: string) {
  return new JsonRpcProvider(rpcUrl);
}
