---
name: essential-eth-api
description: API reference for essential-eth, a lightweight Ethereum utility library (43 kB alternative to ethers.js/web3.js). Covers providers, contract calls, unit conversions, hashing, address utilities, ABI encoding, and byte manipulation. Use when writing code that imports from essential-eth.
---

# essential-eth API

essential-eth is a tree-shakeable Ethereum library using native `bigint` (no BigNumber). It provides three entry points of increasing size:

- `essential-eth/conversions` -- unit conversions only (~1.2 kB)
- `essential-eth/utils` -- utilities without providers
- `essential-eth` -- full library with providers and contracts

## Providers

Create a provider to interact with an EVM chain via JSON-RPC:

```typescript
import {
  JsonRpcProvider,
  jsonRpcProvider,
  FallthroughProvider,
  AlchemyProvider,
} from 'essential-eth';

// Single RPC
const provider = new JsonRpcProvider(
  'https://eth-mainnet.g.alchemy.com/v2/KEY',
);

// Factory function (avoids "new")
const provider2 = jsonRpcProvider('https://rpc.ankr.com/eth');

// Multiple RPCs with automatic fallback
const fallthrough = new FallthroughProvider([
  'https://eth-mainnet.g.alchemy.com/v2/KEY',
  'https://rpc.ankr.com/eth',
]);

// Alchemy shorthand
const alchemy = new AlchemyProvider({ apiKey: 'KEY' });
```

### Provider methods

All methods return Promises.

| Method                                    | Returns               | Description                                   |
| ----------------------------------------- | --------------------- | --------------------------------------------- |
| `getBalance(address, blockTag?)`          | `bigint`              | Account balance in wei                        |
| `getBlock(blockTag?)`                     | `BlockResponse`       | Block data                                    |
| `getBlockNumber()`                        | `number`              | Latest block number                           |
| `getCode(address, blockTag?)`             | `string`              | Contract bytecode                             |
| `getGasPrice()`                           | `bigint`              | Current gas price in wei                      |
| `getFeeData()`                            | `FeeData`             | Gas price, maxFeePerGas, maxPriorityFeePerGas |
| `getLogs(filter)`                         | `Log[]`               | Event logs matching filter                    |
| `getNetwork()`                            | `Network`             | Chain name, chainId, ensAddress               |
| `getTransaction(txHash)`                  | `TransactionResponse` | Transaction by hash                           |
| `getTransactionReceipt(txHash)`           | `TransactionReceipt`  | Receipt by hash                               |
| `getTransactionCount(address, blockTag?)` | `number`              | Nonce                                         |
| `call(tx, blockTag?)`                     | `string`              | Execute read-only call                        |
| `estimateGas(tx)`                         | `bigint`              | Estimated gas                                 |
| `resolveName(ensName)`                    | `string \| null`      | ENS to address                                |
| `lookupAddress(address)`                  | `string \| null`      | Address to ENS (reverse)                      |

## Contract

Read-only smart contract interaction. `Contract` and `BaseContract` are equivalent (`Contract` extends `BaseContract`):

```typescript
import { Contract, BaseContract, JsonRpcProvider } from 'essential-eth';

const provider = new JsonRpcProvider('https://rpc.ankr.com/eth');
const dai = new Contract(
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  daiAbi, // JSON ABI array
  provider,
);

const balance = await dai.balanceOf('0x...');
```

The Contract constructor takes `(address, jsonAbi, provider)`. Methods defined in the ABI become callable async functions on the instance. Pass `{ gasLimit: N }` as the last argument to override gas.

## Unit Conversions

All conversions accept `string | number | bigint` and return `bigint` (except format functions which return `string`).

```typescript
import {
  etherToWei,
  weiToEther,
  etherToGwei,
  gweiToEther,
} from 'essential-eth';

etherToWei('1.5'); // 1500000000000000000n
weiToEther(1000000000n); // '0.000000001'
etherToGwei('0.5'); // 500000000n
gweiToEther(21000000000n); // '21.0'
```

```typescript
import { formatUnits, parseUnits } from 'essential-eth';

formatUnits(1000000n, 6); // '1.0'     (USDC-style 6 decimals)
parseUnits('1.5', 18); // 1500000000000000000n
```

Ultra-light import for conversions only:

```typescript
import { etherToWei, weiToEther } from 'essential-eth/conversions';
```

## Hashing

```typescript
import {
  keccak256,
  solidityKeccak256,
  id,
  hashMessage,
  namehash,
} from 'essential-eth';

keccak256('0x1234');
solidityKeccak256(['address', 'uint256'], ['0x...', 100]); // also exported as pack

id('Transfer(address,address,uint256)'); // keccak256 of UTF-8 string
hashMessage('hello'); // EIP-191 prefixed hash
namehash('vitalik.eth'); // ENS namehash
```

## Address Utilities

```typescript
import {
  getAddress,
  toChecksumAddress,
  isAddress,
  computeAddress,
} from 'essential-eth';

isAddress('0x...'); // boolean
getAddress('0x...'); // checksummed or throws
toChecksumAddress('0x...'); // checksummed address
computeAddress('0x04...'); // address from public key
computePublicKey('0x...'); // uncompressed public key from compressed
```

## ABI Encoding

```typescript
import {
  encodeFunctionData,
  decodeFunctionResult,
  decodeEventLog,
} from 'essential-eth';

const data = encodeFunctionData(abiItem, [arg1, arg2]);
const result = decodeFunctionResult(abiItem, hexData);
const event = decodeEventLog(abiItem, data, topics);
```

## Byte Utilities

```typescript
import {
  arrayify,
  hexlify,
  concat,
  hexConcat,
  hexZeroPad,
  zeroPad,
  stripZeros,
  isHexString,
  isBytes,
  isBytesLike,
  hexDataSlice,
  hexDataLength,
  hexStripZeros,
  hexValue,
} from 'essential-eth';

arrayify('0x1234'); // Uint8Array([0x12, 0x34])
hexlify([0x12, 0x34]); // '0x1234'
concat(['0x12', '0x34']); // Uint8Array
hexZeroPad('0x1', 32); // '0x0000...0001'
isHexString('0xabcd'); // true
```

## String Utilities

```typescript
import { toUtf8Bytes, toUtf8String } from 'essential-eth';
import { encodeBytes32String, decodeBytes32String } from 'essential-eth';

toUtf8Bytes('hello'); // Uint8Array
toUtf8String(new Uint8Array([])); // string
encodeBytes32String('hello'); // bytes32 hex
decodeBytes32String('0x...'); // string
```

## Signature Utilities

```typescript
import { splitSignature } from 'essential-eth';

splitSignature('0x...'); // { r, s, v, recoveryParam, compact }
```

## Event Utilities

```typescript
import { getEventSignature, getEventTopic } from 'essential-eth';

getEventSignature(abiEventItem); // 'Transfer(address,address,uint256)'
getEventTopic(abiEventItem); // keccak256 of the signature
```

## Key Differences from ethers.js

- Uses native `bigint` instead of `BigNumber`
- No signer support (read-only)
- No wallet/key management
- ~10x smaller bundle size
- Tree-shakeable entry points
