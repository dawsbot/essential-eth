import type { JSONABI } from '../types/Contract.types';
import { keccak256 } from './keccak256';
import { toUtf8Bytes } from './to-utf8-bytes';

/**
 * Computes the keccak256 hash (topic0) of an event signature string.
 *
 * @param eventSignature the event signature, e.g. "Transfer(address,address,uint256)"
 * @returns the keccak256 hash as a hex string
 * @example
 * ```javascript
 * getEventTopic('Transfer(address,address,uint256)');
 * // '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
 * ```
 */
export function getEventTopic(eventSignature: string): string {
  return keccak256(toUtf8Bytes(eventSignature));
}

/**
 * Builds an event signature from a JSONABI array and event name, then returns
 * its keccak256 hash (topic0).
 *
 * @param abi the contract ABI as a JSONABI array
 * @param eventName the name of the event to look up
 * @returns the keccak256 hash of the event signature as a hex string
 * @example
 * ```javascript
 * const abi = [
 *   {
 *     type: 'event',
 *     name: 'Transfer',
 *     inputs: [
 *       { name: 'from', type: 'address', indexed: true },
 *       { name: 'to', type: 'address', indexed: true },
 *       { name: 'value', type: 'uint256', indexed: false },
 *     ],
 *   },
 * ];
 * getEventSignature(abi, 'Transfer');
 * // '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
 * ```
 */
export function getEventSignature(abi: JSONABI, eventName: string): string {
  const event = abi.find(
    (entry) => entry.type === 'event' && entry.name === eventName,
  );
  if (!event) {
    throw new Error(`Event "${eventName}" not found in ABI`);
  }
  const signature = `${event.name}(${event.inputs.map((input) => input.type).join(',')})`;
  return getEventTopic(signature);
}
