import { cleanBlock } from '../classes/utils/clean-block';
import { cleanTransaction } from '../classes/utils/clean-transaction';
import { buildRPCPostBody, post } from '../classes/utils/fetchers';
import { hexToDecimal } from '../classes/utils/hex-to-decimal';
import { TinyBig, tinyBig } from '../shared/tiny-big/tiny-big';
import { BlockResponse, BlockTag, RPCBlock } from '../types/Block.types';
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
  ): Promise<BlockResponse> {
    let rpcTimeFrame: string;
    if (typeof timeFrame === 'number') {
      // exact block numbers require hex string format
      rpcTimeFrame = `0x${timeFrame.toString(16)}`;
    } else {
      // "latest", "earliest", and "pending" require no manipulation
      rpcTimeFrame = timeFrame;
    }
    const req = (): Promise<RPCBlock> =>
      post(
        this._rpcUrl,
        buildRPCPostBody('eth_getBlockByNumber', [
          rpcTimeFrame,
          returnTransactionObjects,
        ]),
      );
    const nodeResponse = await req();

    return cleanBlock(nodeResponse, returnTransactionObjects);
  }
  /**
   * Returns the network this provider is connected to
   */
  public async getNetwork(): Promise<Network> {
    const req = (): Promise<string> =>
      post(this._rpcUrl, buildRPCPostBody('eth_chainId', []));
    const nodeResponse = await req();
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
    const req = (): Promise<string> =>
      post(this._rpcUrl, buildRPCPostBody('eth_gasPrice', []));
    const nodeResponse = await req(); /* '0x153cfb1ad0' */
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
    const req = (): Promise<string> =>
      post(
        this._rpcUrl,
        buildRPCPostBody('eth_getBalance', [address, blockTag]),
      );
    const nodeResponse = await req(); /* '0x153cfb1ad0' */
    return tinyBig(hexToDecimal(nodeResponse));
  }
  /**
   * Similar to `ethers.provider.getTransaction`, some information not included
   *
   * @params hash A transaction hash
   * @returns information about one transaction
   * @example
   * ```js
   * await provider.getTransaction('0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789');
   *  {
      accessList: [],
      blockHash: '0x876810a013dbcd140f6fd6048c1dc33abbb901f1f96b394c2fa63aef3cb40b5d',
      blockNumber: 14578286,
      chainId: 1,
      from: '0xdfD9dE5f6FA60BD70636c0900752E93a6144AEd4',
      gas: Big {
        s: 1,
        e: 5,
        c: [ 1, 1, 2, 1, 6, 3 ],
        constructor: <ref *1> [Function: Big] {
          DP: 20,
          RM: 1,
          NE: -7,
          PE: 21,
          strict: false,
          roundDown: 0,
          roundHalfUp: 1,
          roundHalfEven: 2,
          roundUp: 3,
          Big: [Circular *1],
          default: [Circular *1]
        }
      },
      gasPrice: Big {
        s: 1,
        e: 10,
        c: [
          4, 8, 5, 9, 2,
          4, 2, 6, 8, 5,
          8
        ],
        constructor: <ref *1> [Function: Big] {
          DP: 20,
          RM: 1,
          NE: -7,
          PE: 21,
          strict: false,
          roundDown: 0,
          roundHalfUp: 1,
          roundHalfEven: 2,
          roundUp: 3,
          Big: [Circular *1],
          default: [Circular *1]
        }
      },
      hash: '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789',
      input: '0x83259f170000000000000000000000000000000000000000000000000000000000000080000000000000000000000000dfd9de5f6fa60bd70636c0900752e93a6144aed400000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000009e99ad11a214fd016b19dc3648678c5944859ae292b21c24ca94f857836c4596f1950c82dd0c23dd621af4763edc2f66466e63c5df9de0c1107b1cd16bf460fe93e43fd308e3444bc79c3d88a4cb961dc8367ab6ad048867afc76d193bca99cf3a068864ed4a7df1dbf1d4c52238eced3e5e05644b4040fc2b3ccb8557b0e99fff6131305a0ea2b8061b90bd418db5bbdd2e92129f52d93f90531465e309c4caec5b85285822b6196398d36f16f511811b61bbda6461e80e29210cd303118bdcee8df6fa0505ffbe8642094fd2ba4dd458496fe3b459ac880bbf71877c713e969ccf5ed7efab8a84ebc07e3939901371ca427e1192e455a8f35a6a1d7ad09e1475dd1758b36fa631dab5d70e99316b23c4c43094188d360cd9c3457355904e07c00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000162074a7047f',
      maxFeePerGas: Big {
        s: 1,
        e: 10,
        c: [
          6, 7, 6, 8, 1,
          2, 6, 1, 6, 1,
          8
        ],
        constructor: <ref *1> [Function: Big] {
          DP: 20,
          RM: 1,
          NE: -7,
          PE: 21,
          strict: false,
          roundDown: 0,
          roundHalfUp: 1,
          roundHalfEven: 2,
          roundUp: 3,
          Big: [Circular *1],
          default: [Circular *1]
        }
      },
      maxPriorityFeePerGas: Big {
        s: 1,
        e: 9,
        c: [ 1, 5 ],
        constructor: <ref *1> [Function: Big] {
          DP: 20,
          RM: 1,
          NE: -7,
          PE: 21,
          strict: false,
          roundDown: 0,
          roundHalfUp: 1,
          roundHalfEven: 2,
          roundUp: 3,
          Big: [Circular *1],
          default: [Circular *1]
        }
      },
      nonce: 129,
      r: '0x59a7c15b12c18cd68d6c440963d959bff3e73831ffc938e75ecad07f7ee43fbc',
      s: '0x1ebaf05f0d9273b16c2a7748b150a79d22533a8cd74552611cbe620fee3dcf1c',
      to: '0x39B72d136ba3e4ceF35F48CD09587ffaB754DD8B',
      transactionIndex: 29,
      type: 2,
      v: 0,
      value: Big {
        s: 1,
        e: 0,
        c: [ 0 ],
        constructor: <ref *1> [Function: Big] {
          DP: 20,
          RM: 1,
          NE: -7,
          PE: 21,
          strict: false,
          roundDown: 0,
          roundHalfUp: 1,
          roundHalfEven: 2,
          roundUp: 3,
          Big: [Circular *1],
          default: [Circular *1]
        }
      },
      confirmations: 1210
    }
   * ```
   */
  public async getTransaction(hash: string): Promise<TransactionResponse> {
    const fetchTransaction = async (): Promise<RPCTransaction> =>
      post(this._rpcUrl, buildRPCPostBody('eth_getTransactionByHash', [hash]));
    const [transaction, blockNumber] = await Promise.all([
      fetchTransaction(),
      this.getBlock('latest'),
    ]);
    const cleanedTransaction = cleanTransaction(transaction);
    // https://ethereum.stackexchange.com/questions/2881/how-to-get-the-transaction-confirmations-using-the-json-rpc
    cleanedTransaction.confirmations =
      blockNumber.number - cleanedTransaction.blockNumber + 1;
    return cleanedTransaction;
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
