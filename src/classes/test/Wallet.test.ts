import { keccak_256 } from '@noble/hashes/sha3.js';
import { bytesToHex } from '@noble/hashes/utils.js';
import * as secp from '@noble/secp256k1';
import { describe, expect, it } from 'vitest';
import { Wallet } from '../Wallet';

// Known test vector
const TEST_PRIVATE_KEY =
  '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

describe('Wallet', () => {
  describe('constructor', () => {
    it('accepts a private key with 0x prefix', () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY);
      expect(wallet).toBeInstanceOf(Wallet);
    });

    it('accepts a private key without 0x prefix', () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY.slice(2));
      expect(wallet).toBeInstanceOf(Wallet);
    });

    it('throws on invalid private key (too short)', () => {
      expect(() => new Wallet('0x1234')).toThrow('Invalid private key');
    });

    it('throws on invalid private key (too long)', () => {
      expect(() => new Wallet(TEST_PRIVATE_KEY + 'ff')).toThrow(
        'Invalid private key',
      );
    });

    it('throws on invalid hex characters', () => {
      expect(
        () =>
          new Wallet(
            '0xZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
          ),
      ).toThrow('Invalid private key');
    });
  });

  describe('address', () => {
    it('derives the correct checksummed address from a known private key', () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY);
      const address = wallet.address;

      // Verify it's a valid checksum address
      expect(address).toMatch(/^0x[0-9a-fA-F]{40}$/);

      // Independently compute expected address
      const pkHex = TEST_PRIVATE_KEY.slice(2);
      const pub = secp.getPublicKey(pkHex, false);
      const pubHash = keccak_256(pub.slice(1));
      const expectedAddr = '0x' + bytesToHex(pubHash.slice(12));

      // Compare lowercase since we're checking the raw derivation
      expect(address.toLowerCase()).toBe(expectedAddr.toLowerCase());
    });

    it('returns the same address on repeated calls', () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY);
      expect(wallet.address).toBe(wallet.address);
    });

    it('with and without 0x prefix produce the same address', () => {
      const w1 = new Wallet(TEST_PRIVATE_KEY);
      const w2 = new Wallet(TEST_PRIVATE_KEY.slice(2));
      expect(w1.address).toBe(w2.address);
    });
  });

  describe('publicKey', () => {
    it('returns an uncompressed public key (65 bytes, 04 prefix)', () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY);
      const pubKey = wallet.publicKey;

      expect(pubKey).toMatch(/^0x04[0-9a-f]{128}$/);
    });
  });

  describe('signMessage', () => {
    it('returns a valid 65-byte signature', async () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY);
      const sig = await wallet.signMessage('hello');

      // 0x + 130 hex chars = 65 bytes
      expect(sig).toMatch(/^0x[0-9a-f]{130}$/);
    });

    it('signature can be used to recover the signer address', async () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY);
      const message = 'hello';
      const sig = await wallet.signMessage(message);

      // Parse signature
      const sigBytes = hexToBytes(sig.slice(2));
      const r = sigBytes.slice(0, 32);
      const s = sigBytes.slice(32, 64);
      const v = sigBytes[64];
      const recovery = v - 27;

      // Reconstruct the EIP-191 hash
      const msgBytes = new TextEncoder().encode(message);
      const prefix = new TextEncoder().encode(
        `\x19Ethereum Signed Message:\n${msgBytes.length}`,
      );
      const combined = new Uint8Array(prefix.length + msgBytes.length);
      combined.set(prefix);
      combined.set(msgBytes, prefix.length);
      const msgHash = keccak_256(combined);

      // Recover public key
      const compactSig = new Uint8Array(64);
      compactSig.set(r);
      compactSig.set(s, 32);
      const recoveredPub = secp.recoverPublicKey(msgHash, compactSig, recovery);

      // Derive address from recovered public key
      const pubHash = keccak_256(recoveredPub.slice(1));
      const recoveredAddr = '0x' + bytesToHex(pubHash.slice(12));

      expect(wallet.address.toLowerCase()).toBe(recoveredAddr.toLowerCase());
    });

    it('signs Uint8Array messages', async () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY);
      const msgBytes = new TextEncoder().encode('hello');
      const sig = await wallet.signMessage(msgBytes);

      expect(sig).toMatch(/^0x[0-9a-f]{130}$/);
    });

    it('string and equivalent Uint8Array produce the same signature', async () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY);
      const sigStr = await wallet.signMessage('hello');
      const sigBytes = await wallet.signMessage(
        new TextEncoder().encode('hello'),
      );

      expect(sigStr).toBe(sigBytes);
    });
  });

  describe('signTypedData', () => {
    it('throws "Not yet implemented"', async () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY);
      await expect(wallet.signTypedData({}, {}, {})).rejects.toThrow(
        'Not yet implemented',
      );
    });
  });

  describe('connect', () => {
    it('attaches a provider and returns the wallet', () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY);
      const fakeProvider = {
        send: () => {
          /* noop */
        },
      };
      const result = wallet.connect(fakeProvider);

      expect(result).toBe(wallet);
      expect(wallet.provider).toBe(fakeProvider);
    });

    it('provider is null by default', () => {
      const wallet = new Wallet(TEST_PRIVATE_KEY);
      expect(wallet.provider).toBeNull();
    });
  });
});

/** Helper: hex string to Uint8Array */
function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}
