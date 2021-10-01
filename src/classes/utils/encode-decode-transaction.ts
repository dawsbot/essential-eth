import { Keccak } from 'sha3';
import { tinyBig, toChecksumAddress } from '../..';
import { JSONABIArgument } from '../../types/Contract.types';
import { hexToDecimal } from './hex-to-decimal';
export function encodeData(jsonABIArgument: JSONABIArgument, args: any[]) {
  const hash = new Keccak(256);
  /* first 4 bytes will create the data parameter */
  const functionString = `${jsonABIArgument.name}(${jsonABIArgument.inputs.map(
    (input) => input.type,
  )})`;

  // encoding learnt from https://ethereum.stackexchange.com/questions/3514/how-to-call-a-contract-method-using-the-eth-call-json-rpc-api
  const functionHash = hash.update(functionString).digest('hex');
  if (args.length !== jsonABIArgument.inputs.length) {
    throw new Error(
      `args inputs  of "${args.length}" does not match expected length of "${jsonABIArgument.inputs.length}"`,
    );
  }
  const encodedArgs = (args || []).map((arg: any, i: number) => {
    let rawArg = arg;
    const inputType = jsonABIArgument.inputs[i].type;
    if (inputType === 'bool') {
      if (arg) {
        return '0000000000000000000000000000000000000000000000000000000000000001';
      } else {
        return '0000000000000000000000000000000000000000000000000000000000000000';
      }
    }
    // remove leading "0x" on address types
    else if (inputType === 'address') {
      rawArg = arg.replace(/^0x/g, '').toLowerCase();
    }
    const argEncoded = rawArg.toString(16);
    const paddedEncodedArg = argEncoded.padStart(64, '0');
    return paddedEncodedArg;
  });
  const functionEncoded = functionHash.slice(0, 8);
  const data = `0x${functionEncoded}${encodedArgs.join('')}`;
  return data;
}

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
        switch (output) {
          case '0000000000000000000000000000000000000000000000000000000000000001':
            return true;
          case '0000000000000000000000000000000000000000000000000000000000000000':
            return false;
          default:
            throw new Error(`boolean response of ${output} not defined`);
        }
      case 'address':
        /* address types have 26 leading zeroes to remove */
        return toChecksumAddress(`0x${output.slice(24)}`);
      case 'uint256':
        return tinyBig(hexToDecimal(`0x${output}`));
      case 'bytes32':
        return `0x${output}`;
      case 'uint8':
        return Number(hexToDecimal(`0x${output}`));
      default:
        throw new Error(
          `essential-eth does not yet support "${outputType}" inputs. Make a PR today!"`,
        );
    }
  });

  return outputs.length === 1 ? outputs[0] : outputs;
}
