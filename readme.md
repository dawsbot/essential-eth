<p align="center">
  <img src="https://user-images.githubusercontent.com/3408480/163274699-ae4fb0f4-fca0-4745-bcd7-4868f80deaf6.png" height="220" title="Logo"/>

</p>
<p align="center">

  <b>
    🪶 Essential Eth 🪶
  </b>
  <br/>
  <i>An alternative for ethers & web3 that's 20x smaller</i>
  <br/>
</p>

<br/>

## Why you should replace Ethers.js and web3

<p align="center">
<img src="https://user-images.githubusercontent.com/3408480/133322814-f3d18424-4ba8-4a37-8cbc-c5e6828354a3.png" title="Import size comparison" width="900"/>
</p>

---

[![🧪 tests](https://github.com/Earnifi/essential-eth/actions/workflows/test.yml/badge.svg)](https://github.com/Earnifi/essential-eth/actions/workflows/test.yml) [![codecov](https://codecov.io/gh/Earnifi/essential-eth/branch/master/graph/badge.svg?token=E44EK6RWTZ)](https://codecov.io/gh/Earnifi/essential-eth) ![](https://badgen.net/bundlephobia/minzip/essential-eth) ![](https://badgen.net/bundlephobia/tree-shaking/essential-eth) ![](https://img.shields.io/npm/v/essential-eth)

<br/>

- 🐜️ [tiny](https://bundlephobia.com/package/essential-eth)
- 🔐 Strongly written TypeScript
- 🧪 Matches both `ethers` and `web3`
  - ⚡️ Near-identical API to `ethers`
  - ⚡️ Similar but improved API to `web3`
- 🙌 Works for all EVM chains
  - 💎 Ethereum
  - 🟣 Polygon
  - 🔴 Optimism
  - 🔵 Arbitrum
  - [Many more](src/providers/utils/chains-info.ts)
- 🧪 Strongly tested
- 🌲 Tree-shaking and no side-effects
- 🙌 All common JS versions (CommonJS, ESM, & UMD)
  - ✅ Node 18, 16, 14, & 12
  - ✅ Web

<br/>

## Table of Contents

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (TOC:collapse=true&collapseText=Click to expand) -->
<details>
<summary>Click to expand</summary>

- [Why you should replace Ethers.js and web3](#why-you-should-replace-ethersjs-and-web3)
- [Install](#install)
- [🛠 Utils](#-utils)
  - [`arrayify`](#arrayify)
  - [`computeAddress`](#computeaddress)
  - [`computePublicKey`](#computepublickey)
  - [`concat`](#concat)
  - [`etherToGwei`](#ethertogwei)
  - [`etherToWei`](#ethertowei)
  - [`gweiToEther`](#gweitoether)
  - [`hashMessage`](#hashmessage)
  - [`hexConcat`](#hexconcat)
  - [`hexDataLength`](#hexdatalength)
  - [`hexDataSlice`](#hexdataslice)
  - [`hexStripZeros`](#hexstripzeros)
  - [`hexValue`](#hexvalue)
  - [`hexZeroPad`](#hexzeropad)
  - [`hexlify`](#hexlify)
  - [`isAddress`](#isaddress)
  - [`isBytes`](#isbytes)
  - [`isBytesLike`](#isbyteslike)
  - [`isHexString`](#ishexstring)
  - [`jsonRpcProvider`](#jsonrpcprovider)
  - [`keccak256`](#keccak256)
  - [`pack`](#pack)
  - [`solidityKeccak256`](#soliditykeccak256)
  - [`splitSignature`](#splitsignature)
  - [`stripZeros`](#stripzeros)
  - [`tinyBig`](#tinybig)
  - [`toChecksumAddress`](#tochecksumaddress)
  - [`toUtf8Bytes`](#toutf8bytes)
  - [`weiToEther`](#weitoether)
  - [`zeroPad`](#zeropad)
- [Providers](#providers)
  - [`call`](#call)
  - [`estimateGas`](#estimategas)
  - [`getBalance`](#getbalance)
  - [`getBlock`](#getblock)
  - [`getBlockNumber`](#getblocknumber)
  - [`getCode`](#getcode)
  - [`getGasPrice`](#getgasprice)
  - [`getLogs`](#getlogs)
  - [`getNetwork`](#getnetwork)
  - [`getTransaction`](#gettransaction)
  - [`getTransactionCount`](#gettransactioncount)
  - [`getTransactionReceipt`](#gettransactionreceipt)
- [Contract](#contract)
  - [`contractFunctionName(args)`](#contractfunctionnameargs)
- [More Info](#more-info)
  - [Identical vs Similar vs Dissimliar {&#035;isd}](#identical-vs-similar-vs-dissimliar-isd)
  - [Miscellaneous](#miscellaneous)

</details>

<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

  <br/>

## Install

```sh
npm install --save essential-eth # TypeScript included

# or yarn
yarn add essential-eth # TypeScript included
```

Browsers:

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (UNPKG_SCRIPT_TAG) -->

```html
<!-- index.html -->
<script src="https://unpkg.com/essential-eth@0.6.2"></script>
```

<!-- ⛔️ AUTO-GENERATED-CONTENT:END (UNPKG_SCRIPT_TAG) -->

<br/>

## 🛠 Utils

```typescript
import { etherToWei } from 'essential-eth';

// or in a non-import environment
const { etherToWei } = require('essential-eth');
```

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (FUNCTIONS) -->

#### [`arrayify`](https://eeth.dev/docs/api/modules#arrayify)

```typescript
arrayify(value: number | BytesLike | Hexable, options: DataOptions): Uint8Array
```

  <br/>

#### [`computeAddress`](https://eeth.dev/docs/api/modules#computeaddress)

```typescript
computeAddress(key: string): string
```

  <br/>

#### [`computePublicKey`](https://eeth.dev/docs/api/modules#computepublickey)

```typescript
computePublicKey(privKey: BytesLike): string
```

  <br/>

#### [`concat`](https://eeth.dev/docs/api/modules#concat)

```typescript
concat(arrayOfBytesLike: Array<BytesLikeWithNumber>): Uint8Array
```

  <br/>

#### [`etherToGwei`](https://eeth.dev/docs/api/modules#ethertogwei)

```typescript
etherToGwei(etherQuantity: string | number | TinyBig | Big): TinyBig
```

  <br/>

#### [`etherToWei`](https://eeth.dev/docs/api/modules#ethertowei)

```typescript
etherToWei(etherQuantity: string | number | TinyBig | Big): TinyBig
```

  <br/>

#### [`gweiToEther`](https://eeth.dev/docs/api/modules#gweitoether)

```typescript
gweiToEther(gweiQuantity: string | number | TinyBig | Big): TinyBig
```

  <br/>

#### [`hashMessage`](https://eeth.dev/docs/api/modules#hashmessage)

```typescript
hashMessage(message: string | Bytes): string
```

  <br/>

#### [`hexConcat`](https://eeth.dev/docs/api/modules#hexconcat)

```typescript
hexConcat(items: Array<BytesLike>): string
```

  <br/>

#### [`hexDataLength`](https://eeth.dev/docs/api/modules#hexdatalength)

```typescript
hexDataLength(data: BytesLike): undefined
```

  <br/>

#### [`hexDataSlice`](https://eeth.dev/docs/api/modules#hexdataslice)

```typescript
hexDataSlice(data: BytesLikeWithNumber, offset: number, endOffset: number): string
```

  <br/>

#### [`hexStripZeros`](https://eeth.dev/docs/api/modules#hexstripzeros)

```typescript
hexStripZeros(value: BytesLike): string
```

  <br/>

#### [`hexValue`](https://eeth.dev/docs/api/modules#hexvalue)

```typescript
hexValue(value: number | bigint | BytesLike | Hexable): string
```

  <br/>

#### [`hexZeroPad`](https://eeth.dev/docs/api/modules#hexzeropad)

```typescript
hexZeroPad(value: BytesLikeWithNumber, length: number): string
```

  <br/>

#### [`hexlify`](https://eeth.dev/docs/api/modules#hexlify)

```typescript
hexlify(value: number | bigint | BytesLike | Hexable, options: DataOptions): string
```

  <br/>

#### [`isAddress`](https://eeth.dev/docs/api/modules#isaddress)

```typescript
isAddress(address: string): boolean
```

  <br/>

#### [`isBytes`](https://eeth.dev/docs/api/modules#isbytes)

```typescript
isBytes(value: any): value
```

  <br/>

#### [`isBytesLike`](https://eeth.dev/docs/api/modules#isbyteslike)

```typescript
isBytesLike(value: any): value
```

  <br/>

#### [`isHexString`](https://eeth.dev/docs/api/modules#ishexstring)

```typescript
isHexString(value: any, length: number): boolean
```

  <br/>

#### [`jsonRpcProvider`](https://eeth.dev/docs/api/modules#jsonrpcprovider)

```typescript
jsonRpcProvider(rpcUrl: string): JsonRpcProvider
```

  <br/>

#### [`keccak256`](https://eeth.dev/docs/api/modules#keccak256)

```typescript
keccak256(data: BytesLike): string
```

  <br/>

#### [`pack`](https://eeth.dev/docs/api/modules#pack)

```typescript
pack(types: Array<string>, values: Array<any>): string
```

  <br/>

#### [`solidityKeccak256`](https://eeth.dev/docs/api/modules#soliditykeccak256)

```typescript
solidityKeccak256(types: Array<string>, values: Array<any>): string
```

  <br/>

#### [`splitSignature`](https://eeth.dev/docs/api/modules#splitsignature)

```typescript
splitSignature(signature: SignatureLike): Signature
```

  <br/>

#### [`stripZeros`](https://eeth.dev/docs/api/modules#stripzeros)

```typescript
stripZeros(value: BytesLike): Uint8Array
```

  <br/>

#### [`tinyBig`](https://eeth.dev/docs/api/modules#tinybig)

```typescript
tinyBig(value: string | number | TinyBig | Big): TinyBig
```

  <br/>

#### [`toChecksumAddress`](https://eeth.dev/docs/api/modules#tochecksumaddress)

```typescript
toChecksumAddress(address: string): string
```

  <br/>

#### [`toUtf8Bytes`](https://eeth.dev/docs/api/modules#toutf8bytes)

```typescript
toUtf8Bytes(data: string): Uint8Array
```

  <br/>

#### [`weiToEther`](https://eeth.dev/docs/api/modules#weitoether)

```typescript
weiToEther(weiQuantity: string | number | TinyBig | Big): TinyBig
```

  <br/>

#### [`zeroPad`](https://eeth.dev/docs/api/modules#zeropad)

```typescript
zeroPad(value: BytesLike, length: number): Uint8Array
```

  <br/>

<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

- _The return-type `TinyBig` is just [`Big`](https://github.com/MikeMcl/big.js) but expands scientific notation on `toNumber()` and `toString()`_

<br/>
<br/>

## Providers

```typescript
import { JsonRpcProvider } from 'essential-eth';
const provider = new JsonRpcProvider('RPC URL HERE' /* Try POKT or Infura */);
// OR for very quick testing (limited to 10,000 requests)
const provider = new JsonRpcProvider();
```

<details>
  <summary>Want a redundant provider that handles outages?</summary>

```typescript
import { FallthroughProvider } from 'essential-eth';

// The FallthroughProvider handles falling through to the next valid URL.
// It's dynamic to never trust one URL again when it fails * until it has tried all other provided URLs
// The default timeout for a request is 8 seconds after which it moves to the next URL
const provider = new FallthroughProvider([
  'https://bad.com',
  'https://free-eth-node.com/api/eth',
]);
provider.getGasPrice().toNumber();
/*
39695942769
*/
```

</details>

 <br/>

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (PROVIDER) -->

#### [`call`](https://eeth.dev/docs/api/classes/JsonRpcProvider#call)

```typescript
provider.call(transaction: TransactionRequest, blockTag?: BlockTag): Promise<string>
```

  <br/>

#### [`estimateGas`](https://eeth.dev/docs/api/classes/JsonRpcProvider#estimategas)

```typescript
provider.estimateGas(transaction: TransactionRequest): Promise<TinyBig>
```

  <br/>

#### [`getBalance`](https://eeth.dev/docs/api/classes/JsonRpcProvider#getbalance)

```typescript
provider.getBalance(address: string, blockTag?: BlockTag): Promise<TinyBig>
```

  <br/>

#### [`getBlock`](https://eeth.dev/docs/api/classes/JsonRpcProvider#getblock)

```typescript
provider.getBlock(timeFrame?: BlockTag, returnTransactionObjects?: boolean): Promise<BlockResponse>
```

  <br/>

#### [`getBlockNumber`](https://eeth.dev/docs/api/classes/JsonRpcProvider#getblocknumber)

```typescript
provider.getBlockNumber(): Promise<number>
```

  <br/>

#### [`getCode`](https://eeth.dev/docs/api/classes/JsonRpcProvider#getcode)

```typescript
provider.getCode(address: string, blockTag?: BlockTag): Promise<string>
```

  <br/>

#### [`getGasPrice`](https://eeth.dev/docs/api/classes/JsonRpcProvider#getgasprice)

```typescript
provider.getGasPrice(): Promise<TinyBig>
```

  <br/>

#### [`getLogs`](https://eeth.dev/docs/api/classes/JsonRpcProvider#getlogs)

```typescript
provider.getLogs(filter: Filter | FilterByBlockHash): Promise<Array<Log>>
```

  <br/>

#### [`getNetwork`](https://eeth.dev/docs/api/classes/JsonRpcProvider#getnetwork)

```typescript
provider.getNetwork(): Promise<Network>
```

  <br/>

#### [`getTransaction`](https://eeth.dev/docs/api/classes/JsonRpcProvider#gettransaction)

```typescript
provider.getTransaction(transactionHash: string): Promise<TransactionResponse>
```

  <br/>

#### [`getTransactionCount`](https://eeth.dev/docs/api/classes/JsonRpcProvider#gettransactioncount)

```typescript
provider.getTransactionCount(address: string, blockTag?: BlockTag): Promise<number>
```

  <br/>

#### [`getTransactionReceipt`](https://eeth.dev/docs/api/classes/JsonRpcProvider#gettransactionreceipt)

```typescript
provider.getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>
```

  <br/>

<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

<br/>

## Contract

⚠️ Only read functions are currently supported. ⚠️

- 🧪 `Contract` support is **experimental**, do not use this in production yet. (even though [earni.fi](https://earni.fi) does)

Encoding support:

- `bool`
- `bytes`
- `address`

Decoding support:

- `bool`
- `address`
- `uint256`
- `bytes32`
- `uint8`

_Assume all types outside the above types will break for now_

```typescript
import { Contract, jsonRpcProvider, JSONABI } from 'essential-eth';
// UNI airdrop contract
const contractAddress = '0x090D4613473dEE047c3f2706764f49E0821D256e';
const provider = jsonRpcProvider(/* RPC URL optional */);

const abi: JSONABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'isClaimed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const contract = new Contract(contractAddress, abi, provider);

(async () => {
  // prints boolean as to whether index 0 has claimed airdrop or not
  console.log(await contract.isClaimed(0));
})();
```

#### `contractFunctionName(args)`

Any function on a contract. Returns are the same as `ethers.js`, except that instead of BigNumber, `essential-eth` always returns a [`TinyBig`](https://eeth.dev/classes/TinyBig.html)

<br/>
<br/>

![Screen Shot 2022-01-12 at 10 25 29 AM](https://user-images.githubusercontent.com/3408480/149190699-9bc15719-9382-46af-a77b-45e138f37643.png)

![Screen Shot 2022-01-12 at 10 24 57 AM](https://user-images.githubusercontent.com/3408480/149190691-ed2913b9-8c14-4a8e-b5f8-0895fbac279b.png)

## More Info

🧪 This repo is under active development. The API is less-fully featured than `web3` and `ethers`. More functions added often!

👨🏻‍💻 Breaking changes will exist between minor versions until `1.0.0` (Versions go `major.minor.patch`)

<br/>

![Alt](https://repobeats.axiom.co/api/embed/e479d8f777288a94cdde2fe3cdedf38d5243793d.svg 'Repobeats analytics image')

<br/>

### Identical vs Similar vs Dissimliar {#isd}

Throughout the documentation for `essential-eth`, you may notice that some functions are compared to `ethers.js` and `web3.js`. The keywords `identical`, `similar`, and `dissimilar` are used to help you migrate to `essential-eth`. Here's a guide on what these keywords mean:

- Identical -- should behave exactly like the library you're already using, except the types might be different (`TinyBig` vs [`Bn.js`](https://github.com/indutny/bn.js)).
- Similar -- can probably be used as a replacement to the library you're currently using, except there are some differences. Read the notes next to this keyword to see why these aren't considered `identical`.
- Dissimilar -- _should not_ be used in place of the function you're currently using. Read the notes next to this keyword to see why these functions aren't considered `similar`, and potentially learn how to alter your implementation to make `essential-eth` work for you.

Note: In `web3.js`, almost every method or function can be passed a callback. `essential-eth`, like `ethers.js`, does not include this functionality and trusts that users will rely on the much more modern [promise](https://javascript.info/promise-basics) and [async/await](https://javascript.info/async-await) patterns.

### Miscellaneous

- [📓 View full docs](https://eeth.dev)
- [📓 View changelog (by looking at releases diff)](https://github.com/dawsbot/essential-eth/releases)
