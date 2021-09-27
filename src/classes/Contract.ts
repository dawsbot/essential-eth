import { Keccak } from 'sha3';
import { tinyBig, toChecksumAddress } from '..';
import { ContractInterface } from '../types/Contract.types';
import { EssentialEth } from './EssentialEth';
import { buildRPCPostBody, post } from './utils/fetchers';
import { hexToDecimal } from './utils/hex-to-decimal';
export class BaseContract {
  /**
   * The URL to your Eth node. Consider POKT or Infura
   */
  readonly _address: string;
  readonly _contractInterface: ContractInterface /* JSON ABI's only for stronger types */;
  readonly _provider: EssentialEth;

  /**
   * @param addressOrName - The ethereum address of the smart-contract
   * @param contractInterface - The JSON ABI of the smart-contract (like http://api.etherscan.io/api?module=contract&action=getabi&address=0x090d4613473dee047c3f2706764f49e0821d256e&format=raw)
   * @param signerOrProvider - An instantiated essential-eth provider
   */
  constructor(
    addressOrName: string,
    contractInterface: ContractInterface,
    signerOrProvider: EssentialEth,
  ) {
    this._address = addressOrName;
    this._contractInterface = contractInterface;
    this._provider = signerOrProvider;
    contractInterface
      .filter((argument) => argument.type === 'function')
      .forEach((argument) => {
        if ('name' in argument && typeof argument.name === 'string') {
          defineReadOnly(this, argument.name, async (...args: any) => {
            const hash = new Keccak(256);
            const rawOutputs = argument.outputs;

            /* first 4 bytes will create the data parameter */
            // TODO: only supports one input
            const functionString = `${argument.name}(${argument.inputs.map(
              (input) => input.internalType,
            )})`;

            // encoding learnt from https://ethereum.stackexchange.com/questions/3514/how-to-call-a-contract-method-using-the-eth-call-json-rpc-api
            const functionHash = hash.update(functionString).digest('hex');
            const encodedArgs = (args || []).map((arg: any, i: number) => {
              let rawArg = arg;
              // remove leading "0x" on address types
              if (argument.inputs[i].type === 'address') {
                rawArg = arg.replace(/^0x/g, '').toLowerCase();
              }
              const argEncoded = rawArg.toString(16);
              const paddedEncodedArg = argEncoded.padStart(64, '0');
              return paddedEncodedArg;
            });
            const functionEncoded = functionHash.slice(0, 8);
            const myData = `0x${functionEncoded}${encodedArgs.join('')}`;
            const nodeResponse = await post(
              this._provider._rpcUrl,
              buildRPCPostBody('eth_call', [
                {
                  to: this._address,
                  data: myData,
                },
                'latest',
              ]),
            ).then((res) => {
              const data = res.result as any;
              return data;
            });
            // chunk response every 64 characters
            const encodedOutputs = nodeResponse.slice(2).match(/.{1,64}/g);
            const outputs = (encodedOutputs || []).map(
              (output: string, i: number) => {
                const outputType = (rawOutputs || [])[i].type;
                if (outputType === 'bool') {
                  // TODO: make this dynamic and not manually hard-coded case/switch
                  switch (output) {
                    case '0000000000000000000000000000000000000000000000000000000000000001':
                      return true;
                      break;
                    case '0000000000000000000000000000000000000000000000000000000000000000':
                      return false;
                      break;
                    default:
                      throw new Error(
                        `boolean response of ${output} not defined`,
                      );
                      break;
                  }
                } else if (outputType === 'address') {
                  /* address types have 26 leading zeroes to remove */
                  return toChecksumAddress(`0x${output.slice(24)}`);
                } else if (outputType === 'uint256') {
                  return tinyBig(hexToDecimal(`0x${output}`));
                } else if (outputType === 'bytes32') {
                  return `0x${output}`;
                }
              },
            );
            return outputs.length === 1 ? outputs[0] : outputs;
          });
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
 * import { Contract, EssentialEth } from 'essential-eth';
 * // UNI airdrop contract
 * const contractAddress = '0x090D4613473dEE047c3f2706764f49E0821D256e';
 * const provider = new EssentialEth();
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