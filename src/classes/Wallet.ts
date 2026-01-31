import { hmac } from '@noble/hashes/hmac.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { keccak_256 } from '@noble/hashes/sha3.js';
import { bytesToHex } from '@noble/hashes/utils.js';
import * as secp from '@noble/secp256k1';
import { toChecksumAddress } from '../utils/to-checksum-address';

// Configure @noble/secp256k1 v1.x for sync operations
secp.utils.hmacSha256Sync = (key: Uint8Array, ...msgs: Uint8Array[]) => {
  const h = hmac.create(sha256, key);
  msgs.forEach((m) => h.update(m));
  return h.digest();
};

/**
 * A Wallet manages a private key and can sign messages.
 * @example
 * ```javascript
 * import { Wallet } from 'essential-eth';
 *
 * const wallet = new Wallet('0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef');
 * console.log(wallet.address); // checksummed Ethereum address
 *
 * const sig = await wallet.signMessage('hello');
 * console.log(sig); // 0x... (65-byte hex signature)
 * ```
 */
export class Wallet {
  private readonly _privateKey: Uint8Array;
  private _provider: unknown | null = null;

  /**
   * Creates a new Wallet instance.
   * @param privateKey A 32-byte private key as a hex string (with or without 0x prefix)
   */
  constructor(privateKey: string) {
    const hex = privateKey.replace(/^0x/i, '');

    if (!/^[0-9a-f]{64}$/i.test(hex)) {
      throw new Error(
        'Invalid private key: must be a 32-byte hex string (64 hex characters)',
      );
    }

    this._privateKey = hexToBytes(hex);
  }

  /**
   * The checksummed Ethereum address derived from the private key.
   */
  get address(): string {
    const uncompressedPub = secp.getPublicKey(this._privateKey, false);
    // Remove the 0x04 prefix byte, hash, take last 20 bytes
    const pubHash = keccak_256(uncompressedPub.slice(1));
    const addrHex = '0x' + bytesToHex(pubHash.slice(12));
    return toChecksumAddress(addrHex);
  }

  /**
   * The uncompressed public key (with 04 prefix) as a hex string.
   */
  get publicKey(): string {
    const pub = secp.getPublicKey(this._privateKey, false);
    return '0x' + bytesToHex(pub);
  }

  /**
   * Signs a message following EIP-191 (personal_sign) standard.
   *
   * The message is prefixed with "\\x19Ethereum Signed Message:\\n" + message.length
   * before being hashed with keccak256 and signed with secp256k1.
   * @param message The message to sign (string or Uint8Array)
   * @returns The signature as a hex string (r + s + v, 65 bytes / 130 hex chars + 0x prefix)
   */
  async signMessage(message: string | Uint8Array): Promise<string> {
    let messageBytes: Uint8Array;
    if (typeof message === 'string') {
      messageBytes = new TextEncoder().encode(message);
    } else {
      messageBytes = message;
    }

    // EIP-191 prefix
    const prefix = new TextEncoder().encode(
      `\x19Ethereum Signed Message:\n${messageBytes.length}`,
    );

    // Concatenate prefix + message
    const combined = new Uint8Array(prefix.length + messageBytes.length);
    combined.set(prefix);
    combined.set(messageBytes, prefix.length);

    // Hash
    const msgHash = keccak_256(combined);

    // Sign (returns [DER-encoded sig, recovery])
    const [derSig, recovery] = secp.signSync(msgHash, this._privateKey, {
      recovered: true,
    });

    // Parse DER to get compact r+s (64 bytes)
    const sig = secp.Signature.fromDER(derSig);
    const compactBytes = sig.toCompactRawBytes();

    // Build 65-byte Ethereum signature: r (32) + s (32) + v (1)
    const v = recovery + 27;
    const fullSig = new Uint8Array(65);
    fullSig.set(compactBytes, 0);
    fullSig[64] = v;

    return '0x' + bytesToHex(fullSig);
  }

  /**
   * Signs EIP-712 typed data. Not yet implemented.
   * @param _domain
   * @param _types
   * @param _value
   * @throws Always throws "Not yet implemented"
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signTypedData(
    _domain: unknown,
    _types: unknown,
    _value: unknown,
  ): Promise<string> {
    throw new Error('Not yet implemented');
  }

  /**
   * Returns a new Wallet connected to the specified provider.
   * The provider is stored for future sendTransaction support.
   * @param provider A JSON-RPC provider instance
   * @returns This wallet instance with the provider attached
   */
  connect(provider: unknown): Wallet {
    this._provider = provider;
    return this;
  }

  /**
   * The currently connected provider, if any.
   */
  get provider(): unknown | null {
    return this._provider;
  }
}

/**
 * Converts a hex string (without 0x prefix) to Uint8Array
 * @param hex
 */
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}
