---
id: 'index'
title: 'essential-eth'
slug: '/api/'
sidebar_label: 'Readme'
sidebar_position: 0
custom_edit_url: null
---

<p align="center">
  <a><img src="https://blog.ethereum.org/img/2018/08/grants_eth_logo.png" title="Logo" height="400"/></a>
</p>
<p align="center">
  <b>
    Essential Eth
  </b>
  <br/>
  <i>Ultralight Ethereum utilities for JS and TS</i>
  <br/>
</p>

---

<br/>

## Why you should replace Ethers.js and web3

<p align="center">
<img src="https://user-images.githubusercontent.com/3408480/133322814-f3d18424-4ba8-4a37-8cbc-c5e6828354a3.png" title="Import size comparison" width="900"/>
</p>

![Screen Shot 2022-01-12 at 10 25 29 AM](https://user-images.githubusercontent.com/3408480/149190699-9bc15719-9382-46af-a77b-45e138f37643.png)

![Screen Shot 2022-01-12 at 10 24 57 AM](https://user-images.githubusercontent.com/3408480/149190691-ed2913b9-8c14-4a8e-b5f8-0895fbac279b.png)

---

<br/>

- ⚡️ A replacement for `web3` and `ethers`
- 🏎 [The TINIEST code size possible](https://bundlephobia.com/package/essential-eth)
- ʦ Fully typed with TypeScript (also works with JavaScript)
- 🧪 Tested to match both `web3` and `ethers`
- 🌲 Tree-shaking and no side-effects
- 🙌 Supports multiple JS versions (CommonJS and ESM)
  - ✅ Node 17, 16, 14, & 12
  - ✅ Web

<br/>

## More Info

🧪 This repo is under active development. The API is less-fully featured than `web3` and `ethers`. More functions added often!

![](https://badgen.net/bundlephobia/minzip/essential-eth) ![](https://badgen.net/bundlephobia/tree-shaking/essential-eth) ![](https://img.shields.io/npm/v/essential-eth) ![](https://badgen.net/bundlephobia/dependency-count/essential-eth)

👨🏻‍💻 Breaking changes will exist between minor versions until `1.0.0` (Versions go `major.minor.patch`)

<br/>

## Install

```sh
npm install --save essential-eth # TypeScript types load automatically

# or if you prefer yarn
yarn add essential-eth # TypeScript types load automatically
```

<br/>

## Utils (do not require connecting to an Eth node)

```typescript
import { etherToWei } from 'essential-eth';

// or in a non-import environment
const { etherToWei } = require('essential-eth');
```

- The return-type `TinyBig` is just [`Big`](https://github.com/MikeMcl/big.js) but expands scientific notation on `toNumber()` and `toString()`

<br/>

#### `etherToWei`

```typescript
// convert ether to wei
etherToWei(etherQuantity: string | number | TinyBig | Big): TinyBig
```

<details>
  <summary>View Example</summary>

```typescript
import { etherToWei } from 'essential-eth';

etherToWei(1).toString();
// "1000000000000000000"

etherToWei(1).toNumber();
// 1000000000000000000

etherToWei('1').toNumber();
// 1000000000000000000
```

</details>

<br/>

#### `weiToEther`

```typescript
// convert wei to ether
weiToEther(weiQuantity: string | number | TinyBig | Big): TinyBig
```

<details>
  <summary>View Example</summary>

```typescript
import { weiToEther } from 'essential-eth';

weiToEther(1000000000000000000).toString();
// "1"

weiToEther(1000000000000000000).toNumber();
// 1
weiToEther('1000000000000000000').toNumber();
// 1
```

</details>

<br/>

#### `toChecksumAddress`

```typescript
// return proper mixed-case address
// does not support ICAP addresses
toChecksumAddress(address: string): string
```

<details>
  <summary>View Example</summary>

```typescript
import { toChecksumAddress } from 'essential-eth';

toChecksumAddress('0xc0deaf6bd3f0c6574a6a625ef2f22f62a5150eab');
// "0xc0DEAF6bD3F0c6574a6a625EF2F22f62A5150EAB"
```

</details>

<br/>

#### `isAddress`

```typescript
// returns boolean as to whether input is a valid address
// does not support ENS nor ICAP
isAddress(address: string): boolean
```

<details>
  <summary>View Example</summary>

```typescript
import { isAddress } from 'essential-eth';

isAddress('0xc0deaf6bd3f0c6574a6a625ef2f22f62a5150eab');
// true

isAddress('bad');
// false

// Does NOT support ENS.
isAddress('vitalik.eth');
// false
```

</details>

<br/>

## RPC

```typescript
import { JsonRpcProvider } from 'essential-eth';
const essentialEth = new JsonRpcProvider(
  'RPC URL HERE' /* Try POKT or Infura */,
);
// OR for very quick testing (limited to 500 requests)
const essentialEth = new JsonRpcProvider();
```

#### `getGasPrice`

Returns the current gas price in gwei

```typescript
// Same as ethers.provider.getGasPrice
getGasPrice(): Promise<TinyBig>
```

<details>
  <summary>View Example</summary>

```typescript
import { JsonRpcProvider } from 'essential-eth';

const provider = new JsonRpcProvider('https://free-eth-node.com/api/eth');
provider.getGasPrice().toNumber();
/*
39695942769
*/
```

</details>

<br/>

#### `getNetwork`

Returns a [Network](src/types/Network.types.ts)

```typescript
// Same API as ethers getNetwork
getNetwork(): Promise<Network>
```

<details>
  <summary>View Example</summary>

```typescript
import { JsonRpcProvider } from 'essential-eth';

const maticProvider = new JsonRpcProvider(
  'https://free-eth-node.com/api/matic',
);
maticProvider.getNetwork();
/*
{ chainId: 137, name: 'MATIC', ensAddress: null }
*/

const xdaiProvider = new JsonRpcProvider('https://free-eth-node.com/api/xdai');
xdaiProvider.getNetwork();
/*
{ chainId: 100, name: 'xdai', ensAddress: null } }
*/
```

</details>

<br/>

#### `getBlock`

Returns a [Block](src/types/Block.types.ts)

```typescript
// Same API as web3.eth.getBlock
getBlock(timeFrame: number | "latest" | "earliest" | "pending", returnTransactionObjects?: boolean): Promise<Block>
```

<details>
  <summary>View Example</summary>

```typescript
import { JsonRpcProvider } from 'essential-eth';
const essentialEth = new JsonRpcProvider();
essentialEth.getBlock('latest');

/*
{
"baseFeePerGas": "0xf639de71c",
"extraData": "0x4b75436f696e506f6f6c201360d0ff24ef3c3c",
"gasLimit": 30000000,
"gasUsed": 1344062,
"hash": "0xd61a202c828a67085a08a69c4b1e5e096781d7169eaccb47be26147a15145f38",
"logsBloom": "0x00a001060000000000a00000800810010600000040100000000200000020000000c800000000000000004a8000000101020080100800200040400000102061080000048000000918c800400c0800406000000000004010000440120080200008820009000800000004001804000000000041802010000400008200900808a010110000416010201100900008010480050000100101400008040010420010200002101240000020800000008080000000406000880000003000200602100200000001000260000240240000800020100400200000000a0010001000020680000000102008080081400004000800000004000000212000c0500148089002000000",
"miner": "0xd757fd54b273BB1234d4d9993f27699d28d0EDD2",
"mixHash": "0x363138be56fd5304ca6f0ce56d24d6469f4a5a88c771da1ddf7e69fb23c7d599",
"nonce": "0xdb88082877e8b003",
"number": 13402040,
"parentHash": "0xfb7ef17413a17f07791301897f406a05eb3e99acb495bf3bab146a30af5615eb",
"receiptsRoot": "0xfc35fd7463baadc116202ef7a87ddba23a80bd277dd44a4bd3a2b2f48b469be8",
"sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
"size": 7672,
"stateRoot": "0x8fef1cb4b33ce55f43e8d3e2d19a6db55a8311aead0a25b359eef4d6e8ab6870",
"timestamp": 1634019741,
"transactions": Array [
"0x4b5ee005588efa1881d4bdd97c20fb1b311896bd150a62f0379256c12b4d3243",
"0xe28945b5b7bb1963e765b117a88b2fd785ef751bb141fbdf03435994ebd22383",
"0xb15b9d44303f0f7a10e5c27320421aa790e12af6bb4f300963da43d5c2ad3a3c",
"0x67296bb97ab2accb35b9b73d2fb856f7f28081a469b8ff7e17a89799af9fb729",
"0xe8530f6c51c4efe9e15bdcc90b5f879895e0f6682de543c92c5d3d09ec149bd7",
"0xbbefd1fc51bac8e10998ccfa2601643a063c68c16cf4b6a91756936084849f36",
"0x37c8ae4037b833936163b22c17f39f11169fbeb2cfc249830b0514411d2a2859",
"0xe47b2ba6979470bc5aa6529fda7969e0758b3123a91b65d9da49b133f196eaa6",
"0x738d2ca35f180a42af6407cb2b724b0c589168740a39e7e1719e30c644766a55",
"0x60df73109fc534c3a2126df1a4ed4cb4946a188bb6d34a49025ec4e41d0ee601",
"0xaf51a25e70321b5c8987acb3e4a2d5e9e8869f9bb74303984e56c37090dbd8ba",
"0xb42bd613800595b21717ea55ea5c2390ffe0ba12297aae0811f6938fbd86c605",
"0x628d637eae8f3bf4c3867fffadfb6c6f09228f0d037abc921d30cb4a7e28fa57",
"0xf6f19b03636250610e9a724eff7b265cbeed737b0a018500ebbe91e3aaf9ebaf",
"0x2376f3a78b63d482d4edcfd7903faeaee49e95b0fb12894f49e6c0ed6709d51a",
"0xbbc5634af5882ec73d713f6a3c34a6ff6915c18ab445c9c6d5ff1fb185dcb2d2",
"0x15349a7d15861d7f50310a392397a3c7c43a19d70c5543738943b6222460633a",
"0x2a166ca1491a05decf2c107050877c62e194c3bdc95a72de79acb39271ebfea1",
"0x55efd630c466b58e2051afb55f66f8f415c93c330c7e48e439f0667cf67407c1",
"0xbd095088949d323b4ab7cbeeba2534693c14d2a9c25e923bf87cd5c1edfce00a",
"0xeb4f9d928020962c6a13ac7de0fb09d0d5c0a0064060d11f2e8cebc6d60443f0",
"0x482fb59cef1804ff20752c50b737ab44b4db942e7816d4ff38827109f79c5b6c",
"0xf0d87f44454bf2f2d23c72c775ca9051848bf8fe4ce293c8d0a7160a5c7b366d",
],
"transactionsRoot": "0x7fd87cbada35409e8a235c7d087d8bb7af6cfa0c7985d825ca69851b4192879f",
"uncles": Array [],
*/
```

</details>

<br/>

## Contract

⚠️ Only read functions are currently supported. ⚠️

- 🧪 This is **highly experimental**, do not use this in production yet. (even though [earni.fi](https://earni.fi) does)

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

_Assume any smart-contract method outside the above types will break_

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

Any function on a contract. Returns are the same as `ethers.js`, except that instead of BigNumber, `essential-eth` always returns a [`TinyBig`](https://essential-eth.vercel.app/classes/TinyBig.html)

<br/>
<br/>

- [📓 View full docs](https://essential-eth.vercel.app)
- [📓 View changelog (by looking at releases diff)](https://github.com/dawsbot/essential-eth/releases)
- [📓 View docs for an older version](https://essential-eth.vercel.app/versions)
