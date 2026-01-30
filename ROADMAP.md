# 🪶 The Essential Eth Master Plan

**Mission: Become the default Ethereum library for developers who ship.**

ethers.js won by being simpler than web3. viem is gaining by being type-safe. essential-eth wins by being *essential* — everything you need, nothing you don't. 40 kB vs 400 kB isn't a feature. It's a philosophy.

---

## The Moat

essential-eth is **10x smaller** than ethers and viem. That's not an optimization — it's a structural advantage. ethers and viem *cannot* shed that weight without breaking changes. Every feature they add makes them heavier. Every feature we add keeps us lean. Time is on our side.

| Library | Full Bundle | Provider | Contract | Conversions |
|---------|:-----------:|:--------:|:--------:|:-----------:|
| **essential-eth** | **39.9 kB** 🏆 | **28.9 kB** 🏆 | **24.8 kB** 🏆 | **1.2 kB** 🏆 |
| ethers v6 | 394.0 kB | 260.0 kB | 86.6 kB | 10.4 kB |
| viem | 384.6 kB | 305.7 kB | 179.8 kB | 2.7 kB |

---

## Phase 1: Feature Parity (Remove Adoption Blockers)

These are the reasons people evaluate essential-eth, love it, and then can't switch.

### ✅ Native BigInt Migration
- **Status:** DONE
- Removed big.js and TinyBig entirely
- Zero dependencies for math — just native `BigInt`

### ✅ ENS Resolution
- **Status:** DONE (PR #295)
- `provider.resolveName('vitalik.eth')` → address
- Standalone `namehash` export
- Table stakes for any serious Ethereum library

### 🔲 Wallet & Signing (THE Big One)
- **Status:** NOT STARTED
- **Priority:** CRITICAL — #1 adoption blocker
- **What's needed:**
  - `Wallet` class (private key → sign transactions)
  - `signMessage(message)` — personal_sign
  - `signTypedData(domain, types, value)` — EIP-712
  - `sendTransaction(tx)` — broadcast to network
  - EIP-1193 provider wrapper (`window.ethereum` / browser wallets)
- **Why it matters:** Without this, essential-eth is read-only. Nobody building a real dApp can fully switch. They keep ethers/viem around for signing, which means they never remove it from their bundle.
- **Design principle:** Don't implement HD wallets, mnemonics, BIP-39 — that's optional complexity. Start with raw private key signing. Keep it tiny.

### 🔲 ABI Encoding/Decoding as First-Class Exports
- **Status:** NOT STARTED
- **Priority:** HIGH
- **What's needed:**
  - `encodeFunctionData(abi, functionName, args)` 
  - `decodeFunctionResult(abi, functionName, data)`
  - `encodeDeployData(abi, bytecode, args)`
  - `Interface` class or equivalent
- **Why it matters:** The Contract class already does this internally. Exposing it lets other tools embed essential-eth's encoder — 3-5 kB ABI encoding that other libraries and build tools can depend on. This is how you get adopted indirectly.

### 🔲 Event Decoding & Logs
- **Status:** NOT STARTED  
- **Priority:** MEDIUM
- **What's needed:**
  - `decodeEventLog(abi, log)` 
  - Contract event listeners (`contract.on('Transfer', ...)`)
  - Topic hashing utilities
- **Why it matters:** Parsing event logs is bread-and-butter for indexers, dashboards, and analytics. Can't be a complete library without it.

### 🔲 WebSocket Provider
- **Status:** NOT STARTED
- **Priority:** MEDIUM
- **What's needed:**
  - `WebSocketProvider` with `eth_subscribe` support
  - Reconnection logic
  - Event-based API for new blocks, pending transactions, logs
- **Why it matters:** Real-time apps need subscriptions. JSON-RPC polling is not enough.

---

## Phase 2: Viral Growth (Get People Talking)

### 🔲 Migration CLI
- **Priority:** HIGH — this is the growth cheat code
- `npx essential-eth migrate ./src`
- Scans code for ethers.js or viem imports
- Shows which ones essential-eth can replace
- Offers to rewrite imports automatically
- Even handling 60% of cases creates a viral loop:
  - Dev tries it → tweets the diff → others try it
- Shows exact bundle savings: "This migration saves 247 kB"

### 🔲 Bundle Size Comparison Tool
- Host at `essential-eth.dev/compare`
- Paste your imports → see exact savings
- Shareable URLs (people LOVE sharing "look how much I saved")
- Auto-generates a migration plan
- Embed essential-eth's own bundle comparison table dynamically

### 🔲 Build Plugin (Vite / Next.js / Webpack)
- Warns when ethers/viem imports exceed a size threshold
- Suggests essential-eth alternatives for each import
- Optional — controversial but attention-getting
- `npm install eslint-plugin-essential-eth`

### 🔲 Dedicated Landing Pages for Target Users
Write content specifically for:
- **Chrome extension devs** — brutal size budgets, every KB matters
- **Serverless / Edge functions** — cold start time = money
- **React Native** — bundle size = app store download time
- **Telegram / Discord bots** — fast cold starts, minimal memory
- **Embedded / IoT** — resource constrained environments

Each page: problem statement, bundle comparison, migration guide, testimonial.

---

## Phase 3: Ecosystem (Become the Standard)

### 🔲 TypeChain / ABIType Integration
- First-class type generation from ABIs
- `essential-eth/codegen` package
- Compete with viem's type-safe contract interactions

### 🔲 Multicall Support
- Built-in `multicall3` batching
- `provider.multicall([...calls])` → batch RPC into one call
- Critical for any app making multiple read calls

### 🔲 Plugin System
- Allow community extensions without bloating core
- `@essential-eth/ens` — full ENS support (reverse resolution, text records, etc.)
- `@essential-eth/signing` — if we want to keep core read-only
- `@essential-eth/multicall`
- Core stays tiny, plugins add what you need

### 🔲 Framework Adapters
- `@essential-eth/react` — hooks (useBalance, useContract, etc.)
- Compete with wagmi but at 1/10th the bundle size
- This is the long game — wagmi locks people into viem

---

## Positioning Strategy

### Stop competing. Start categorizing.

> **ethers and viem are frameworks. essential-eth is a library.**
> Use it when you know what you need. Use them when you don't.

This framing lets people adopt essential-eth *alongside* their existing stack:
- Use essential-eth for hot paths (formatUnits in a UI, isAddress in form validation)
- Keep ethers/viem for complex stuff (until we support it)
- Gradually expand essential-eth's coverage until the other import disappears

### Trojan horse adoption path:
1. Dev uses `essential-eth` for one utility (isAddress, formatUnits)
2. Sees bundle savings in their build output
3. Replaces more utilities
4. Tries the provider — it works identically
5. Waiting for wallet support to go all-in
6. We ship wallet → they remove ethers entirely

---

## Success Metrics

| Metric | Current | Phase 1 Target | Phase 3 Target |
|--------|---------|----------------|----------------|
| npm weekly downloads | ~900 | 10,000 | 100,000 |
| GitHub stars | 308 | 1,000 | 5,000 |
| Bundle size (full) | 39.9 kB | < 50 kB (with signing) | < 60 kB |
| API coverage vs ethers | ~40% | 80% | 95% |

The constraint: **never exceed 60 kB for the full library.** If a feature would push us past that, it becomes a plugin. The size advantage is the brand. Lose that, lose everything.

---

## Non-Goals

- **HD wallets / BIP-39 mnemonics in core** — use a dedicated package
- **Hardware wallet support in core** — plugin territory
- **GraphQL / subgraph client** — out of scope
- **Wallet connect / WalletConnect** — separate package
- **Supporting non-EVM chains** — we are Ethereum-focused

---

## The Rallying Cry

Every dependency is a decision. Every kilobyte is a cost your users pay. The JavaScript ecosystem is drowning in bloat, and Ethereum libraries are some of the worst offenders.

essential-eth exists because **400 kB for `formatUnits` is insane.** Because your Chrome extension shouldn't need 260 kB just to check a balance. Because your serverless function shouldn't cold-start in 2 seconds when it could start in 200ms.

We're not building another ethers. We're building the library ethers should have been.

**Ship light. Ship fast. Ship essential.**
