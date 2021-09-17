<p align="center">
  <a><img src="https://blog.ethereum.org/img/2018/08/grants_eth_logo.png" title="Ethereum triangle" height="300"/></a>
</p>
<p align="center">
  <b>
    Essential Eth
  </b>
  <br>
  <i>Ultralight Ethereum utilities for JS and TS</i>
  <br>
</p>

---

<p align="center">
<img src="https://user-images.githubusercontent.com/3408480/133322814-f3d18424-4ba8-4a37-8cbc-c5e6828354a3.png" title="Ethereum triangle" width="900"/>
</p>

---

<br>

![](https://badgen.net/bundlephobia/minzip/essential-eth) ![](https://badgen.net/bundlephobia/tree-shaking/essential-eth)

![](https://img.shields.io/npm/v/essential-eth)
![](https://badgen.net/bundlephobia/min/essential-eth)
![](https://badgen.net/bundlephobia/dependency-count/essential-eth)

👨🏻‍💻 Breaking changes will exist between minor versions until `1.0.0` (Versions go `major.minor.patch`)

## Features

- ⚡️ A replacement for the utils in web3.js and ethers.js
- 🏎 [The TINIEST code size possible](https://bundlephobia.com/package/essential-eth)
- ʦ Fully typed with TypeScript (also works with JavaScript)
- 🌲 Tree-shaking and no side-effects
- 👩‍⚖️ MIT License

## Install

```sh
npm install --save essential-eth # TypeScript types load automatically

# or if you prefer yarn
yarn add essential-eth # TypeScript types load automatically
```

## Require

```typescript
import { etherToWei } from 'essential-eth';

// or in a non-import environment
const { etherToWei } = require('essential-eth');
```

## Functions

```typescript
// convert ether to wei
etherToWei(etherQuantity: string | number): TinyBig

// convert wei to ether
weiToEther(weiQuantity: string | number): TinyBig

// return proper mixed-case address
toChecksumAddress(address: string): string
```

- [📓 View full docs](https://essential-eth.vercel.app)
- [📓 View docs for an older version](https://essential-eth.vercel.app/versions)
