---
name: essential-eth-api
description: Guides usage of essential-eth, a lightweight Ethereum utility library (43 kB alternative to ethers.js/web3.js). Covers providers, contracts, conversions, hashing, and address utilities. Use when writing code that imports from essential-eth.
---

# essential-eth

A tree-shakeable Ethereum library using native `bigint` (no BigNumber). Minimal alternative to ethers.js and web3.js.

## Entry Points

- `essential-eth` -- full library with providers, contracts, and utilities
- `essential-eth/utils` -- utilities without providers (smaller)
- `essential-eth/conversions` -- unit conversions only (~1.2 kB)

## Key Differences from ethers.js

- Uses native `bigint` instead of `BigNumber`
- Read-only -- no signer or wallet support
- ~10x smaller bundle size
- Tree-shakeable with multiple entry points

## Finding the API

To see all available exports, read `node_modules/essential-eth/dist/index.d.ts`. This is the generated type declarations file and is always up to date.

For source code and JSDoc examples, read files in `node_modules/essential-eth/dist/`. Each function includes `@example` blocks showing usage.

## Quick Reference

**Providers**: `JsonRpcProvider`, `FallthroughProvider`, `AlchemyProvider` -- create with an RPC URL, then call methods like `getBalance`, `getBlock`, `call`, `getLogs`, `resolveName`.

**Contracts**: `new Contract(address, jsonAbi, provider)` -- ABI methods become async functions on the instance. Read-only.

**Conversions**: `etherToWei`, `weiToEther`, `etherToGwei`, `gweiToEther`, `formatUnits`, `parseUnits` -- accept `string | number | bigint`.

**Hashing**: `keccak256`, `solidityKeccak256`, `id`, `hashMessage`, `namehash`.

**Addresses**: `isAddress`, `getAddress`, `toChecksumAddress`, `computeAddress`, `computePublicKey`.

**ABI**: `encodeFunctionData`, `decodeFunctionResult`, `decodeEventLog`.

**Bytes**: `arrayify`, `hexlify`, `concat`, `hexZeroPad`, `isHexString`, and more.
