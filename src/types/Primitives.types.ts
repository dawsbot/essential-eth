/**
 * A hex-encoded string prefixed with `0x`.
 */
export type Hex = `0x${string}`;

/**
 * An Ethereum address (20 bytes, hex-encoded with `0x` prefix).
 */
export type Address = Hex;

/**
 * A 32-byte hash (hex-encoded with `0x` prefix), such as a transaction hash or block hash.
 */
export type Hash = Hex;

/**
 * A log topic (32-byte, hex-encoded with `0x` prefix).
 */
export type LogTopic = Hex | Hex[] | null;
