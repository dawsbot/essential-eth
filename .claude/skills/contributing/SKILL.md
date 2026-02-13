---
name: contributing
description: Guides contributions to essential-eth, a lightweight Ethereum library. Covers adding utility functions, writing tests, JSDoc conventions, and build workflow. Use when adding features, fixing bugs, or writing new utilities for this codebase.
---

# Contributing to essential-eth

essential-eth is a minimal, tree-shakeable Ethereum utility library (~43 kB) that serves as a lightweight alternative to ethers.js and web3.js. It uses native `bigint` instead of BigNumber classes.

## Project Structure

```
src/
├── classes/              # Contract and BaseContract
├── providers/            # JsonRpcProvider, FallthroughProvider, AlchemyProvider
│   └── BaseProvider.ts   # Abstract base with all RPC methods
├── utils/                # One file per utility function
│   └── tests/            # Colocated test files
├── conversions/          # Lightweight conversion-only entry point
├── types/                # TypeScript type definitions (Hex, Address, Hash, etc.)
└── index.ts              # Barrel exports
```

## Adding a New Utility Function

1. **Create `src/utils/<function-name>.ts`** with a single exported function
2. **Add JSDoc** with `@param`, `@returns`, and `@example` tags
3. **Create `src/utils/tests/<function-name>.test.ts`**
4. **Export from `src/index.ts`** (and `src/utils/index-utils.ts` if appropriate)

### Example utility file

````typescript
import type { BytesLike } from './bytes';

/**
 * Brief description of what the function does.
 *
 * @param input description of parameter
 * @returns description of return value
 * @example
 * ```javascript
 * myFunction('0x1234');
 * // '0xabcd...'
 * ```
 */
export function myFunction(input: BytesLike): string {
  // implementation
}
````

### Example test file

```typescript
import { describe, expect, it } from 'vitest';
import { myFunction } from './../my-function';

describe('myFunction', () => {
  it('should handle hex strings', () => {
    expect(myFunction('0x1234')).toBe('expected-output');
  });
});
```

## Coding Conventions

- **One function per file** in `src/utils/`, named with kebab-case
- **Use `interface` not `type`** for object shapes (`@typescript-eslint/consistent-type-definitions`)
- **Use `import type`** for type-only imports (`@typescript-eslint/consistent-type-imports`)
- **No `console.log`** -- `no-console` is set to error
- **JSDoc required** on all non-test source files with `@example` blocks
- **Branded types** -- use `Hex`, `Address`, `Hash` from `src/types/Primitives.types.ts`
- **Native `bigint`** -- never use BigNumber libraries
- **No side effects** -- all utility functions must be pure

## Testing

- Framework: **Vitest** with globals enabled
- Tests live in `src/utils/tests/` or `src/<module>/test/`
- Timeout: 15 seconds
- Run tests: `npm run test` (runs vitest + build + eslint)
- Run just vitest: `npx vitest run`

## Build

- **tsup** builds three entry points: `index`, `utils`, `conversions`
- Output: ESM (with splitting) and CJS
- Run: `npm run build`
- Bundle size matters -- prefer `@noble/hashes` over heavier crypto libraries

## Provider Methods

When adding provider methods, add them to `src/providers/BaseProvider.ts`. Each method should include JSDoc with comparison lines to ethers.js and web3.js equivalents.

## Key Dependencies

- `@noble/hashes` -- cryptographic hashing (keccak256, sha3)
- `@noble/secp256k1` -- elliptic curve operations
- `isomorphic-unfetch` -- universal fetch for RPC calls
