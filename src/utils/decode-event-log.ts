import type { JSONABI, JSONABIArgument } from '../types/Contract.types';
import { keccak256 } from './keccak256';
import { toUtf8Bytes } from './to-utf8-bytes';
import { toChecksumAddress } from './to-checksum-address';

/**
 * Computes the event topic hash (keccak256 of the event signature).
 * Implemented inline to avoid cross-branch dependencies.
 *
 * @param event the ABI entry for the event
 * @returns the keccak256 hash of the event signature
 */
function computeEventTopic(event: JSONABIArgument): string {
  const types = event.inputs.map((input) => input.type);
  const signature = `${event.name}(${types.join(',')})`;
  return keccak256(toUtf8Bytes(signature));
}

/**
 * Decodes a single ABI-encoded value from a 64-character hex chunk.
 *
 * @param hexChunk a 64-character hex string (no 0x prefix)
 * @param type the Solidity type to decode as
 * @returns the decoded value
 */
function decodeValue(hexChunk: string, type: string): any {
  if (type === 'bool') {
    return hexChunk[hexChunk.length - 1] === '1';
  }
  if (type === 'address') {
    return toChecksumAddress(`0x${hexChunk.slice(24)}`);
  }
  if (type === 'bytes32') {
    return `0x${hexChunk}`;
  }
  if (type === 'uint8') {
    return Number(BigInt(`0x${hexChunk}`));
  }
  if (type.startsWith('uint')) {
    return BigInt(`0x${hexChunk}`);
  }
  if (type.startsWith('int')) {
    return BigInt(`0x${hexChunk}`);
  }
  throw new Error(
    `essential-eth does not yet support decoding "${type}" in event logs. Make a PR today!`,
  );
}

/**
 * Decodes an Ethereum event log using the provided ABI.
 *
 * Matches topic0 against event signatures in the ABI, then decodes
 * indexed parameters from topics[1..] and non-indexed parameters from data.
 *
 * @param abi the JSON ABI array containing event definitions
 * @param log the log object with topics array and data hex string
 * @returns an object with eventName and decoded args
 * @example
 * ```javascript
 * const result = decodeEventLog(erc20ABI, {
 *   topics: [
 *     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
 *     '0x000000000000000000000000abc0000000000000000000000000000000000001',
 *     '0x000000000000000000000000abc0000000000000000000000000000000000002',
 *   ],
 *   data: '0x0000000000000000000000000000000000000000000000000000000000000064',
 * });
 * // { eventName: 'Transfer', args: { from: '0xABC0...0001', to: '0xaBc0...0002', value: 100n } }
 * ```
 */
export function decodeEventLog(
  abi: JSONABI,
  log: { topics: string[]; data: string },
): { eventName: string; args: Record<string, any> } {
  const topic0 = log.topics[0];

  // Find matching event in the ABI
  const events = abi.filter((entry) => entry.type === 'event');
  let matchedEvent: JSONABIArgument | undefined;

  for (const event of events) {
    const hash = computeEventTopic(event);
    if (hash === topic0) {
      matchedEvent = event;
      break;
    }
  }

  if (!matchedEvent) {
    throw new Error(
      `No matching event found in ABI for topic0: ${topic0}`,
    );
  }

  const args: Record<string, any> = {};
  let topicIndex = 1; // topics[0] is the event signature
  let dataOffset = 0;

  // Strip 0x prefix from data for chunk parsing
  const rawData = log.data.startsWith('0x') ? log.data.slice(2) : log.data;

  for (const input of matchedEvent.inputs) {
    if (input.indexed) {
      // Indexed params come from topics[1..]
      const topicHex = log.topics[topicIndex];
      const hexChunk = topicHex.startsWith('0x')
        ? topicHex.slice(2)
        : topicHex;
      args[input.name] = decodeValue(hexChunk, input.type);
      topicIndex++;
    } else {
      // Non-indexed params come from data, each 64 hex chars (32 bytes)
      const hexChunk = rawData.slice(dataOffset, dataOffset + 64);
      args[input.name] = decodeValue(hexChunk, input.type);
      dataOffset += 64;
    }
  }

  return {
    eventName: matchedEvent.name as string,
    args,
  };
}
