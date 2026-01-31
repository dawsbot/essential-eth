# Essential-eth for Chrome Extensions

## The Problem: Size Kills Extensions

Every kilobyte matters in a Chrome extension. Manifest V3 service workers are limited to **60MB unpacked**, but real talk: bloated dependencies mean slower load times, higher rejection risk, and angry users. If you're bundling an Ethereum library into a service worker, you're paying for size **with startup latency** and **user experience**.

The ethers.js and viem libraries bring powerful abstractions, but they're designed for web apps with generous budgets. Extensions? They're the opposite.

## The Numbers: 39.9 kB vs The Rest

| Library           | Bundle Size | Gzip        | Over essential-eth |
| ----------------- | ----------- | ----------- | ------------------ |
| **essential-eth** | **39.9 kB** | **12.1 kB** | **—**              |
| ethers.js         | 394 kB      | 104 kB      | **10x larger**     |
| viem              | 348 kB      | 89 kB       | **8.7x larger**    |
| web3.js           | 506 kB      | 131 kB      | **12.7x larger**   |

When your service worker loads in 50ms instead of 500ms, that's **not a nice-to-have. That's a feature.** Your extension stays responsive, snappy, and doesn't trigger Manifest V3 timeout warnings.

## Quick Start: Add Signing to Your Extension

```javascript
import { formatAddress, signMessage } from 'essential-eth';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'signMessage') {
    const signature = signMessage(request.message, request.privateKey);
    sendResponse({ signature });
  }
});
```

## Migrating from ethers.js

**Before (ethers.js):**

```javascript
import { ethers } from 'ethers';
const signer = new ethers.Wallet(privateKey);
const sig = await signer.signMessage(message);
```

**After (essential-eth):**

```javascript
import { signMessage } from 'essential-eth';
const sig = signMessage(message, privateKey);
```

No async wrapper, no overhead. Just the cryptography you need.

## Migrating from viem

**Before (viem):**

```javascript
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const account = privateKeyToAccount(privateKey);
const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});
const sig = await client.signMessage({ message });
```

**After (essential-eth):**

```javascript
import { signMessage } from 'essential-eth';
const sig = signMessage(message, privateKey);
```

viem's modular architecture is great for web apps, but in a service worker you're paying for chain configs, transports, and client abstractions you'll never use. essential-eth gives you the crypto primitives directly — no setup, no async, no 348 kB penalty.

## Migration Checklist

- ✅ Replace `ethers.Wallet` / `privateKeyToAccount` with `signMessage()`, `signTransaction()`
- ✅ Replace `ethers.getAddress()` / `getAddress()` (viem) with `formatAddress()`
- ✅ Replace `ethers.id()` / `keccak256(toHex())` (viem) with `hashMessage()`
- ✅ Keep the same private key format — everything works with hex strings
- ✅ Test your service worker reload time with DevTools

## Ready to Ship?

```bash
npm install essential-eth
```

Then star the project and show your extension users you care about performance:

⭐ [github.com/dawsbot/essential-eth](https://github.com/dawsbot/essential-eth)
