<p align="center">
  <a><img src="https://blog.ethereum.org/img/2018/08/grants_eth_logo.png" title="Ethereum triangle" height="200"/></a>
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

<br>

![](https://badgen.net/bundlephobia/minzip/essential-eth) ![](https://badgen.net/bundlephobia/tree-shaking/essential-eth)

![](https://img.shields.io/npm/v/essential-eth)
![](https://badgen.net/bundlephobia/min/essential-eth)
![](https://badgen.net/bundlephobia/dependency-count/essential-eth)

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
