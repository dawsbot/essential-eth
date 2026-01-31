# Migrating from viem to essential-eth

essential-eth ships a codemod CLI that automatically rewrites viem imports to their essential-eth equivalents. It handles renamed functions, splits partially-supported imports, and reports anything that can't be migrated yet.

## Quick start

```bash
# Preview what would change (no files modified)
npx tsx scripts/migrate.ts ./src --dry-run

# Apply changes
npx tsx scripts/migrate.ts ./src
```

## What gets migrated

| viem                   | essential-eth          | Notes   |
| ---------------------- | ---------------------- | ------- |
| `formatEther`          | `weiToEther`           | renamed |
| `parseEther`           | `etherToWei`           | renamed |
| `formatUnits`          | `formatUnits`          | same    |
| `parseUnits`           | `parseUnits`           | same    |
| `formatGwei`           | `gweiToEther`          | renamed |
| `parseGwei`            | `etherToGwei`          | renamed |
| `getAddress`           | `getAddress`           | same    |
| `isAddress`            | `isAddress`            | same    |
| `keccak256`            | `keccak256`            | same    |
| `hashMessage`          | `hashMessage`          | same    |
| `toHex`                | `hexlify`              | renamed |
| `toBytes`              | `arrayify`             | renamed |
| `concat`               | `concat`               | same    |
| `pad`                  | `zeroPad`              | renamed |
| `trim`                 | `stripZeros`           | renamed |
| `isHex`                | `isHexString`          | renamed |
| `isBytes`              | `isBytes`              | same    |
| `namehash`             | `namehash`             | same    |
| `encodePacked`         | `pack`                 | renamed |
| `decodeFunctionResult` | `decodeFunctionResult` | same    |
| `encodeFunctionData`   | `encodeFunctionData`   | same    |
| `decodeEventLog`       | `decodeEventLog`       | same    |
| `toEventSignature`     | `getEventSignature`    | renamed |
| `toEventHash`          | `getEventTopic`        | renamed |
| `stringToBytes`        | `toUtf8Bytes`          | renamed |
| `bytesToString`        | `toUtf8String`         | renamed |
| `concatHex`            | `hexConcat`            | renamed |
| `slice`                | `hexDataSlice`         | renamed |
| `size`                 | `hexDataLength`        | renamed |

## How it works

1. Recursively scans `.ts`, `.tsx`, `.js`, `.jsx` files in the target directory
2. Finds all `import { ... } from 'viem'` statements (including subpath imports)
3. For each imported symbol:
   - If essential-eth has an equivalent → rewrites the import and renames all usages in the file
   - If not → keeps the viem import and reports it as unsupported
4. If some symbols in an import are supported and some aren't, the import is split into two lines

## Exit codes

- **0** — all viem imports were fully migrated (or none found)
- **1** — some viem imports could not be migrated (unsupported symbols listed in output)

## Bundle savings

Migrating from viem to essential-eth can save **~300 kB** of bundle size — viem ships a large runtime, while essential-eth is designed to be minimal.
