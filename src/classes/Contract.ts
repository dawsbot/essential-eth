import type { JsonRpcProvider } from '../providers/JsonRpcProvider';
import type { ContractInterface } from '../types/Contract.types';
import {
  decodeRPCResponse,
  encodeData,
} from './utils/encode-decode-transaction';
/**
 * @param txnData
 * @example
 */
function estimateGas(txnData: string) {
  // https://ethereum.stackexchange.com/questions/1570/what-does-intrinsic-gas-too-low-mean/1694
  txnData.split('').reduce((previousValue, currentValue) => {
    // 0 characters are 4 gwei, all others are 48 gwei
    const characterCost = currentValue === '0' ? 4 : 68;
    return previousValue + characterCost;
  }, 0);
}
interface Options {
  gasLimit?: number;
}
export class BaseContract {
  /**
   * The URL to your Eth node. Consider POKT or Infura
   */
  private readonly _address: string;
  private readonly _provider: JsonRpcProvider;

  /**
   * @param addressOrName The ethereum address of the smart-contract
   * @param contractInterface The JSON ABI of the smart-contract (like http://api.etherscan.io/api?module=contract&action=getabi&address=0x090d4613473dee047c3f2706764f49e0821d256e&format=raw)
   * @param signerOrProvider An instantiated essential-eth provider
   * @example
   */
  constructor(
    addressOrName: string,
    contractInterface: ContractInterface,
    signerOrProvider: JsonRpcProvider,
  ) {
    this._address = addressOrName;
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
              const req = async (): Promise<string> => {
                return await this._provider.call(
                  {
                    to: this._address.toLowerCase(),
                    data,
                    // sometimes gas is defined in the ABI
                    ...(decimalGas
                      ? { gas: `0x${decimalGas.toString(16)}` }
                      : {}),
                  },
                  'latest',
                );
              };
              const nodeResponse = await req();
              return decodeRPCResponse(jsonABIArgument, nodeResponse);
            },
          );
        }
      });
  }
}

/**
 * Applies the unique contract's methods to the instantiated Contract in the constructor based-upon the provided ABI
 *
 * @internal
 */
export function defineReadOnly<T>(object: T, name: string, value: any): void {
  Object.defineProperty(object, name, {
    enumerable: true,
    value: value,
    writable: false,
  });
}

/**
 * @alpha
 * Only accepts ABIS in JSON format. This allows for stronger typing and assurances of data-types
 * Only read-only function calls currently supported.
 * @example
 * ```typescript
 * import { Contract, JsonRpcProvider } from 'essential-eth';
 * // UNI airdrop contract
 * const contractAddress = '0x090D4613473dEE047c3f2706764f49E0821D256e';
 * const provider = new JsonRpcProvider();
 * // for more robust contract calls, provide a fallback:
 * // const provider = new FallthroughProvider(['bad', 'https://free-eth-node.com/api/eth']);
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
   * The function names on any given contract. Like "isClaimed", "merkleRoot", etc.
   */
  readonly [key: string]: any;
  // readonly [key: string]: ContractFunction | any;
}
