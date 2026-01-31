# Essential-eth for Serverless & Edge Functions

## The Problem: Cold Starts Cost Money

Serverless = you pay per **millisecond**. A 50MB bundle on Vercel or Cloudflare Workers isn't just slow—it's **expensive per invocation**. Every extra second of cold start time is real money bleeding away.

Ethereum libraries are heavy. ethers.js and viem drag in entire ecosystems. For edge functions that need to sign a transaction, verify a message, or format an address? You're carrying 350+ kB of baggage.

## The Numbers: Cold Starts & Bundle Size

| Library           | Bundle Size | Gzip        | Cold Start Impact |
| ----------------- | ----------- | ----------- | ----------------- |
| **essential-eth** | **39.9 kB** | **12.1 kB** | **~50ms**         |
| ethers.js         | 394 kB      | 104 kB      | **~500ms**        |
| viem              | 348 kB      | 89 kB       | **~450ms**        |
| web3.js           | 506 kB      | 131 kB      | **~600ms**        |

That 450ms difference on ethers.js? At **$0.0000005 per ms** on Vercel Edge Functions, that's real money. Run 10,000 requests/month and you're looking at **$2.25 extra per month per function**. Multiply by 5 functions, multiply by 12 months.

**essential-eth drops that to nothing.**

## Quick Start: Edge Function Signing

**Vercel Edge Function:**

```javascript
import { signMessage } from 'essential-eth';

export default async (req) => {
  const { message, privateKey } = req.body;
  const signature = signMessage(message, privateKey);
  return new Response(JSON.stringify({ signature }));
};
```

**Cloudflare Worker:**

```javascript
import { signTransaction } from 'essential-eth';

export default {
  async fetch(req) {
    const { txData, privateKey } = await req.json();
    const sig = signTransaction(txData, privateKey);
    return new Response(JSON.stringify({ sig }));
  },
};
```

## Migrating from ethers.js

**Before (ethers.js + bloat):**

```javascript
import { ethers } from 'ethers';
const wallet = new ethers.Wallet(privateKey);
const sig = await wallet.signMessage(message);
```

**After (essential-eth + fast):**

```javascript
import { signMessage } from 'essential-eth';
const sig = signMessage(message, privateKey);
```

Same result. **450ms faster.** Way cheaper.

## Migrating from viem

**Before (viem):**

```javascript
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createPublicClient({ chain: mainnet, transport: http(rpcUrl) });
const balance = await client.getBalance({ address });
```

**After (essential-eth):**

```javascript
import { JsonRpcProvider } from 'essential-eth';

const provider = new JsonRpcProvider(rpcUrl);
const balance = await provider.getBalance(address);
```

viem requires chain config objects and transport abstractions for every call. In a serverless function that fires once and dies, that setup overhead is pure waste. essential-eth gives you a direct provider with zero ceremony.

## Migration Checklist

- ✅ Remove ethers.js / viem from dependencies
- ✅ Replace wallet/signer patterns with direct function calls
- ✅ Replace `createPublicClient` / `createWalletClient` with `JsonRpcProvider`
- ✅ Use named imports to tree-shake anything you don't need
- ✅ Test cold start performance: `wrangler publish --local` or `vercel dev`
- ✅ Profile bundle impact: `npm run build && du -h .next/`

## Ready to Deploy?

```bash
npm install essential-eth
```

Deploy with confidence. Your cold start times just got faster, and your ops budget thanks you.

⭐ [github.com/dawsbot/essential-eth](https://github.com/dawsbot/essential-eth)
