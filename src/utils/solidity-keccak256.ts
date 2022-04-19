import { tinyBig } from "../shared/tiny-big/tiny-big";
import { Buffer } from "buffer";
import { Keccak } from "sha3";

// Importing from ethers for the time being until an optimized essential-eth option can be made
import { arrayify, zeroPad, concat, hexlify } from "./bytes";
import { logger } from "../logger/logger";

const regexBytes = new RegExp("^bytes([0-9]+)$");
const regexNumber = new RegExp("^(u?int)([0-9]*)$");
const regexArray = new RegExp("^(.*)\\[([0-9]*)\\]$");

const Zeros = "0000000000000000000000000000000000000000000000000000000000000000";

function pack(type: string, value: any, isArray?: boolean): Uint8Array {
  switch(type) {
      case "address":
          if (isArray) { return zeroPad(value, 32); }
          return arrayify(value);
      case "string":
          return Buffer.from(value);
      case "bytes":
          return arrayify(value);
      case "bool":
          value = (value ? "0x01": "0x00");
          if (isArray) { return zeroPad(value, 32); }
          return arrayify(value);
  }

  let match =  type.match(regexNumber);
  if (match) {
      //let signed = (match[1] === "int")
      let size = parseInt(match[2] || "256")

      if ((match[2] && String(size) !== match[2]) || (size % 8 !== 0) || size === 0 || size > 256) {
          logger.throwArgumentError("invalid number type", "type", type)
      }

      if (isArray) { size = 256; }

      // value = BigNumber.from(value).toTwos(size);
      value = tinyBig(value)

      return zeroPad(value, size / 8);
  }

  match = type.match(regexBytes);
  if (match) {
      const size = parseInt(match[1]);

      if (String(size) !== match[1] || size === 0 || size > 32) {
          logger.throwArgumentError("invalid bytes type", "type", type)
      }
      if (arrayify(value).byteLength !== size) {
          logger.throwArgumentError(`invalid value for ${ type }`, "value", value)
      }
      if (isArray) { return arrayify((value + Zeros).substring(0, 66)); }
      return value;
  }

  match = type.match(regexArray);
  if (match && Array.isArray(value)) {
      const baseType = match[1];
      const count = parseInt(match[2] || String(value.length));
      if (count != value.length) {
          logger.throwArgumentError(`invalid array length for ${ type }`, "value", value)
      }
      const result: Array<Uint8Array> = [];
      value.forEach(function(value) {
          result.push(pack(baseType, value, true));
      });
      return concat(result);
  }

  return logger.throwArgumentError("invalid type", "type", type)
}


export function solidityKeccak256(
  types: ReadonlyArray<string>,
  values: ReadonlyArray<any>,
): string {
  if (types.length != values.length) {
    throw new Error(
      `Number of types and values should be the same. (types=${types.toString()}, values=${values.toString()})`,
    );
  }

  const tight: Array<Uint8Array> = [];
  types.forEach((type, index) => {
    tight.push(pack(type, values[index]));
  });

  const hexData: string = hexlify(concat(tight));
  
  const hash = new Keccak(256)
  hash.update(Buffer.from(hexData, 'hex'));
  return hash.digest().toString()
}
