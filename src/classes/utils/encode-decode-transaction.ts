import { Keccak } from 'sha3';
import { tinyBig, toChecksumAddress } from '../..';
import type {
  ContractTypes,
  JSONABIArgument,
} from '../../types/Contract.types';
import { hexToDecimal } from './hex-to-decimal';

export const hexFalse = '0'.repeat(64);
const hexTrue = '0'.repeat(63) + '1';

/**
 * Expands an integer type to use a default of 256 bits. Used for consistency; not required in Solidity
 *
 * @see https://ethereum.stackexchange.com/questions/43241/why-write-uint256-instead-of-uint-if-theyre-the-same-thing
 * @param type the type to explicitly define as 256 bits
 * @returns the integer type expanded to explicitly be 256 bits when possible
 * @example
 * ```javascript
 * expandType('uint[]');
 * // 'uint256[]'
 * ```
 */
function expandType(type: ContractTypes) {
  // https://docs.soliditylang.org/en/v0.8.7/types.html#integers
  if (type === 'uint[]') {
    return 'uint256[]';
  } else if (type === 'int[]') {
    return 'int256[]';
  }
  return type;
}
/**
 *
 * @param jsonABIArgument
 * @param args
 * @example
 */
export function encodeData(jsonABIArgument: JSONABIArgument, args: any[]) {
  const hash = new Keccak(256);
  /* first 4 bytes will create the data parameter */
  const functionString = `${jsonABIArgument.name}(${jsonABIArgument.inputs.map(
    (input) => expandType(input.type),
  )})`;

  // encoding learnt from https://ethereum.stackexchange.com/questions/3514/how-to-call-a-contract-method-using-the-eth-call-json-rpc-api
  const functionHash = hash.update(functionString).digest('hex');
  // no arrays
  const jsonABIInputsLength = jsonABIArgument.inputs.length;
  let shouldValidateInputLength = true;

  // inputs contains 1 or more arrays
  if (jsonABIArgument.inputs.find((input) => input.type.includes('['))) {
    shouldValidateInputLength = false;
  }
  if (shouldValidateInputLength && args.length !== jsonABIInputsLength) {
    throw new Error(
      `args inputs  of "${args.length}" does not match expected length of "${jsonABIArgument.inputs.length}"`,
    );
  }

  const argsWithTypes: [arg: any, type: ContractTypes][] = (
    jsonABIArgument.inputs || []
  ).reduce((acc, input, i) => {
    if (input.type.includes('[')) {
      // strip array and length like "[2]" from type
      const basicType = /([^[]*)\[.*$/g.exec(input.type)?.[1] as string;
      args.forEach((arg: any) => {
        acc = acc.concat([[arg, basicType]]);
      });
      return acc;
    } else {
      return acc.concat([[args[i], input.type]]);
    }
  }, [] as [arg: any, type: ContractTypes][]);

  const encodedArgs = argsWithTypes.map(([arg, inputType]) => {
    let rawArg = arg;
    switch (inputType) {
      case 'bool':
        return arg ? hexTrue : hexFalse;
      case 'address':
        // remove leading "0x"
        rawArg = arg.replace(/^0x/g, '').toLowerCase();
        break;
      default:
        if (inputType.startsWith('bytes')) {
          // encode each character to hex
          const argEncoded = rawArg
            .split('')
            .map((character: string) => character.charCodeAt(0).toString(16))
            .join('');
          const paddedEncodedArg = argEncoded.padEnd(64, '0');
          return paddedEncodedArg;
        } else if (inputType === 'uint256') {
          const argEncoded = BigInt(arg).toString(16);
          const paddedEncodedArg = argEncoded.padStart(64, '0');
          return paddedEncodedArg;
        } else if (inputType.startsWith('uint')) {
          break;
        } else {
          throw new Error(
            `essential-eth does not yet support "${inputType}" inputs. Make a PR today!"`,
          );
        }
    }
    const argEncoded = rawArg.toString(16) as string;
    const paddedEncodedArg = argEncoded.padStart(64, '0');
    return paddedEncodedArg;
  });
  const functionEncoded = functionHash.slice(0, 8);
  const data = `0x${functionEncoded}${encodedArgs.join('')}`;
  return data;
}

/**
 *
 * @param jsonABIArgument The leaf of the JSON ABI for this function
 * @param nodeResponse The raw node output
 * @example
 * @returns Decoded output data
 */
export function decodeRPCResponse(
  jsonABIArgument: JSONABIArgument,
  nodeResponse: string,
) {
  const rawOutputs = jsonABIArgument.outputs;
  // chunk response every 64 characters
  const encodedOutputs = nodeResponse.slice(2).match(/.{1,64}/g);
  const outputs = (encodedOutputs || []).map((output: string, i: number) => {
    const outputType = (rawOutputs || [])[i].type;
    switch (outputType) {
      case 'bool':
        return output === hexTrue;
      case 'address':
        /* address types have 26 leading zeroes to remove */
        return toChecksumAddress(`0x${output.slice(24)}`);
      case 'uint256':
      case 'uint120':
        return tinyBig(hexToDecimal(`0x${output}`));
      case 'bytes32':
        return `0x${output}`;
      case 'uint8':
        return Number(hexToDecimal(`0x${output}`));
      default:
        throw new Error(
          `essential-eth does not yet support "${outputType}" outputs. Make a PR today!"`,
        );
    }
  });

  return outputs.length === 1 ? outputs[0] : outputs;
}
