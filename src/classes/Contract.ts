import { JsonRpcProvider } from '../providers/JsonRpcProvider';
import { ContractInterface } from '../types/Contract.types';
import {
  decodeRPCResponse,
  encodeData,
} from './utils/encode-decode-transaction';
import { buildRPCPostBody, post } from './utils/fetchers';
function estimateGas(txnData: string) {
  // https://ethereum.stackexchange.com/questions/1570/what-does-intrinsic-gas-too-low-mean/1694
  txnData.split('').reduce((previousValue, currentValue) => {
    const characterCost = currentValue === '0' ? 4 : 68;
    return previousValue + characterCost;
  }, 0);
}
type Options = {
  gasLimit?: number;
};
export class BaseContract {
  /**
   * The URL to your Eth node. Consider POKT or Infura
   */
  readonly _address: string;
  readonly _contractInterface: ContractInterface /* JSON ABI's only for stronger types */;
  readonly _provider: JsonRpcProvider;

  /**
   * @param addressOrName - The ethereum address of the smart-contract
   * @param contractInterface - The JSON ABI of the smart-contract (like http://api.etherscan.io/api?module=contract&action=getabi&address=0x090d4613473dee047c3f2706764f49e0821d256e&format=raw)
   * @param signerOrProvider - An instantiated essential-eth provider
   */
  constructor(
    addressOrName: string,
    contractInterface: ContractInterface,
    signerOrProvider: JsonRpcProvider,
  ) {
    this._address = addressOrName;
    this._contractInterface = contractInterface;
    this._provider = signerOrProvider;
    contractInterface
      .filter((jsonABIArgument) => jsonABIArgument.type === 'function')
      .forEach((jsonABIArgument) => {
        if (
          'name' in jsonABIArgument &&
          typeof jsonABIArgument.name === 'string'
        ) {
          defineReadOnly(
            this,
            jsonABIArgument.name,
            async (..._args: any[]) => {
              let functionArguments = _args;
              let options: Options = {};
              // remove options from encoding
              const lastArg = _args[_args.length - 1];
              if (!Array.isArray(lastArg) && typeof lastArg === 'object') {
                options = lastArg;
                functionArguments = _args.slice(0, _args.length - 1);
              }

              const data = encodeData(jsonABIArgument, functionArguments);

              const decimalGas =
                typeof options.gasLimit === 'number'
                  ? options.gasLimit /* user passed in "gasLimit" directly */
                  : typeof jsonABIArgument?.gas ===
                    'number' /* ABI specified "gas". */
                  ? estimateGas(data)
                  : null;
              const nodeResponse = await post(
                this._provider._rpcUrl,

                buildRPCPostBody('eth_call', [
                  {
                    to: this._address.toLowerCase(),
                    data: data,
                    // sometimes gas is defined in the ABI
                    ...(decimalGas
                      ? { gas: `0x${decimalGas.toString(16)}` }
                      : {}),
                  },
                  'latest',
                ]),
              );
              return decodeRPCResponse(jsonABIArgument, nodeResponse);
            },
          );
        }
      });
  }
}

export function defineReadOnly<T>(object: T, name: string, value: any): void {
  Object.defineProperty(object, name, {
    enumerable: true,
    value: value,
    writable: false,
  });
}

/**
 * Only accepts ABIS in JSON format. This allows for stronger typing and assurances of data-types
 *
 * @example
 * ```typescript
 * import { Contract, JsonRpcProvider } from 'essential-eth';
 * // UNI airdrop contract
 * const contractAddress = '0x090D4613473dEE047c3f2706764f49E0821D256e';
 * const provider = new JsonRpcProvider();
 *
 * const JSONABI = [
 *   {
 *     inputs: [
 *       {
 *         internalType: 'uint256',
 *         name: 'index',
 *         type: 'uint256',
 *       },
 *     ],
 *     name: 'isClaimed',
 *     outputs: [
 *       {
 *         internalType: 'bool',
 *         name: '',
 *         type: 'bool',
 *       },
 *     ],
 *     stateMutability: 'view',
 *     type: 'function',
 *   },
 * ]
 *
 * const contract = new Contract(
 *   contractAddress,
 *   JSONABI,
 *   provider,
 * );
 *
 * (async () => {
 *   // prints boolean as to whether index 0 has claimed airdrop or not
 *   console.log(await contract.isClaimed(0));
 * })()
 *
 *
 * ```
 */
export class Contract extends BaseContract {
  // The dynamic function names within a given smart-contract
  /**
   * The dynamic contract calls on any given contract. Like "isClaimed", "merkleRoot", etc.
   */
  readonly [key: string]: any;
  // readonly [key: string]: ContractFunction | any;
}
