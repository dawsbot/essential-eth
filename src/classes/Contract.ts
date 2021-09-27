import { Keccak } from 'sha3';
import { EssentialEth } from './EssentialEth';
import { ContractInterface } from './test/uniswap-abi';
import { buildRPCPostBody, post } from './utils/fetchers';
/**
 * Only accepts ABIS in JSON format. This allows for stronger typing and assurances of data-types
 *
 */
export class BaseContract {
  /**
   * The URL to your Eth node. Consider POKT or Infura
   */
  readonly _address: string;
  readonly _contractInterface: ContractInterface /* JSON ABI's only for stronger types */;
  readonly _provider: EssentialEth;
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
            const outputs = argument.outputs;

            /* first 4 bytes will create the data parameter */
            // TODO: only supports one input
            const functionString = `${argument.name}(${argument.inputs.map(
              (input) => input.internalType,
            )})`;

            // encoding learnt from https://ethereum.stackexchange.com/questions/3514/how-to-call-a-contract-method-using-the-eth-call-json-rpc-api
            const functionHash = hash.update(functionString).digest('hex');
            console.log({ functionHash, functionString });
            const encodedArgs = (args || []).map((arg: any) => {
              const argEncoded = arg.toString(16);
              const paddedEncodedArg = argEncoded.padStart(64, '0');
              return paddedEncodedArg;
            });
            const functionEncoded = functionHash.slice(0, 8);
            const myData = `0x${functionEncoded}${encodedArgs.join('')}`;
            // console.log({
            //   functionHash,
            //   functionString,
            //   encodedArgs,
            //   args,
            //   functionEncoded,
            //   myData,
            // });
            // TODO: only supports integer inputs
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
            // TODO: make this dynamic and not manually hard-coded case/switch
            if (
              Array.isArray(outputs) &&
              outputs.length === 1 &&
              outputs[0]?.type === 'bool'
            ) {
              switch (nodeResponse) {
                case '0x0000000000000000000000000000000000000000000000000000000000000001':
                  return true;
                  break;
                case '0x0000000000000000000000000000000000000000000000000000000000000000':
                  return false;
                  break;
                default:
                  throw new Error(
                    `boolean response of ${nodeResponse} not defined`,
                  );
                  break;
              }
            }
            return nodeResponse;
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
export class Contract extends BaseContract {
  // The dynamic function names within a given smart-contract
  readonly [key: string]: any;
  // readonly [key: string]: ContractFunction | any;
}
