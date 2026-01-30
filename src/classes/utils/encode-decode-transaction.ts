import { keccak_256 } from '@noble/hashes/sha3.js';
import { bytesToHex } from '@noble/hashes/utils.js';
import type {
  ContractTypes,
  JSONABIArgument,
} from '../../types/Contract.types';
import { toChecksumAddress } from '../../utils/to-checksum-address';
import { hexToDecimal } from './hex-to-decimal';

export const hexFalse = '0'.repeat(64);
const hexTrue = '0'.repeat(63) + '1';

/**
 * @param hex
 * @example
 */
function hexToUtf8(hex: any) {
  let str = '';
  let i = 0;
  const l = hex.length;
  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }
  for (; i < l; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16);
    if (code === 0) continue; // Skip null bytes
    str += String.fromCharCode(code);
  }
  try {
    return decodeURIComponent(escape(str)); // Convert UTF-8 to Unicode
  } catch (e) {
    return str; // Return original string if conversion fails
  }
}

/**
 * Expands an integer type to use a default of 256 bits. Used for consistency; not required in Solidity
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
  }
  if (type === 'int[]') {
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
  /* first 4 bytes will create the data parameter */
  const functionString = `${jsonABIArgument.name}(${jsonABIArgument.inputs.map(
    (input) => expandType(input.type),
  )})`;

  // encoding learnt from https://ethereum.stackexchange.com/questions/3514/how-to-call-a-contract-method-using-the-eth-call-json-rpc-api
  const functionHash = bytesToHex(
    keccak_256(new TextEncoder().encode(functionString)),
  );
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
  ).reduce(
    (acc, input, i) => {
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
    },
    [] as [arg: any, type: ContractTypes][],
  );

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
          if (Array.isArray(arg)) {
            throw new Error(
              `essential-eth does not yet support "${inputType}[]" inputs. Make a PR today!"`,
            );
          }
          const argEncoded = BigInt(arg).toString(16);
          const paddedEncodedArg = argEncoded.padStart(64, '0');
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
 * @internal
 * @param jsonABIArgument
 * @param nodeResponse
 * @example
 */
export function decodeRPCResponse(
  jsonABIArgument: JSONABIArgument,
  nodeResponse: string,
) {
  const rawOutputs = jsonABIArgument.outputs || [];
  const slicedResponse = nodeResponse.slice(2);

  if (rawOutputs.length === 1 && rawOutputs[0].type === 'string') {
    const [hexOffset, responseData] = [
      slicedResponse.slice(0, 64),
      slicedResponse.slice(64),
    ];
    const decimalOffset = Number(hexToDecimal(`0x${hexOffset}`));
    const hexLength = responseData.slice(0, decimalOffset * 2);
    const decimalLength = Number(hexToDecimal(`0x${hexLength}`));
    const hexToDecode = responseData.slice(
      decimalOffset * 2,
      decimalOffset * 2 + decimalLength * 2,
    );
    return hexToUtf8(hexToDecode);
  }
  // chunk response every 64 characters
  const encodedOutputs = slicedResponse.match(/.{1,64}/g) || [];
  if (rawOutputs.length === 1 && rawOutputs[0].type === 'address[]') {
    const unformattedAddresses = encodedOutputs.slice(2);
    return unformattedAddresses.map((unformattedAddress) => {
      return toChecksumAddress(`0x${unformattedAddress.slice(24)}`);
    });
  }
  if (rawOutputs?.length === 1 && rawOutputs[0].type === 'uint256[]') {
    const outputs = encodedOutputs.slice(2);
    return outputs.map((output) => {
      return BigInt(hexToDecimal(`0x${output}`));
    });
  }
  const outputs = encodedOutputs.map((output: string, i: number) => {
    const outputType = rawOutputs[i].type;
    switch (outputType) {
      case 'bool':
        return output === hexTrue;
      case 'address':
        /* address types have 24 leading zeroes to remove */
        return toChecksumAddress(`0x${output.slice(24)}`);
      case 'bytes32':
        return `0x${output}`;
      case 'uint8':
        return Number(hexToDecimal(`0x${output}`));

      default:
        if (outputType.startsWith('uint')) {
          return BigInt(hexToDecimal(`0x${output}`));
        }
        if (outputType.startsWith('int')) {
          return BigInt(hexToDecimal(`0x${output}`));
        }
        throw new Error(
          `essential-eth does not yet support "${outputType}" outputs. Make a PR today!"`,
        );
    }
  });

  return outputs.length === 1 ? outputs[0] : outputs;
}
