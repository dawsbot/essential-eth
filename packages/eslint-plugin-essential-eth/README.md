# eslint-plugin-essential-eth

ESLint plugin that suggests [essential-eth](https://github.com/dawsbot/essential-eth) as a lighter alternative to `ethers.js` and `viem`.

## Why?

`ethers.js` and `viem` are powerful Ethereum libraries, but they come with significant bundle sizes. `essential-eth` provides many of the same utility functions at a fraction of the size. This plugin helps you identify opportunities to switch.

## Installation

```bash
npm install --save-dev eslint-plugin-essential-eth
```

## Usage

Add `essential-eth` to your ESLint config plugins, then configure the rules:

### Recommended config

```json
{
  "extends": ["plugin:essential-eth/recommended"]
}
```

### Manual configuration

```json
{
  "plugins": ["essential-eth"],
  "rules": {
    "essential-eth/prefer-essential-eth": "warn",
    "essential-eth/no-heavy-imports": "warn"
  }
}
```

## Rules

### `prefer-essential-eth`

Detects imports of specific functions from `ethers` or `viem` that have direct equivalents in `essential-eth`, and suggests the replacement.

**Mapped functions:**

| ethers/viem import | essential-eth equivalent |
| --- | --- |
| `formatUnits` | `formatUnits` |
| `parseUnits` | `parseUnits` |
| `getAddress` | `getAddress` |
| `isAddress` | `isAddress` |
| `keccak256` | `keccak256` |
| `formatEther` | `weiToEther` |
| `parseEther` | `etherToWei` |
| `toUtf8Bytes` | `toUtf8Bytes` |
| `toUtf8String` | `toUtf8String` |
| `hexlify` | `hexlify` |
| `isHexString` | `isHexString` |

**Example:**

```js
// ⚠️ Warning: 'formatEther' from 'ethers' can be replaced with 'weiToEther' from 'essential-eth'
import { formatEther } from 'ethers';

// ✅ No warning
import { weiToEther } from 'essential-eth';
```

### `no-heavy-imports`

Warns when importing from `ethers` or `viem` top-level, reminding you to check if `essential-eth` provides a lighter alternative.

**Example:**

```js
// ⚠️ Warning: Importing from 'ethers' adds significant bundle weight
import { Contract, formatUnits } from 'ethers';

// ✅ No warning (subpath imports are not flagged)
import { utils } from 'ethers/lib/utils';
```

## License

MIT
