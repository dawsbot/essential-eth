---
id: 'modules'
title: 'essential-eth'
sidebar_label: 'Exports'
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [Contract](classes/Contract.md)
- [JsonRpcProvider](classes/JsonRpcProvider.md)
- [TinyBig](classes/TinyBig.md)

## Interfaces

- [Block](interfaces/Block.md)
- [JSONABIArgument](interfaces/JSONABIArgument.md)
- [Network](interfaces/Network.md)
- [Transaction](interfaces/Transaction.md)

## Type aliases

### ContractTypes

Ƭ **ContractTypes**: `"bool"` \| `"bytes1"` \| `"bytes2"` \| `"bytes3"` \| `"bytes4"` \| `"bytes5"` \| `"bytes6"` \| `"bytes7"` \| `"bytes8"` \| `"bytes9"` \| `"bytes10"` \| `"bytes11"` \| `"bytes12"` \| `"bytes13"` \| `"bytes14"` \| `"bytes15"` \| `"bytes16"` \| `"bytes17"` \| `"bytes18"` \| `"bytes19"` \| `"bytes20"` \| `"bytes21"` \| `"bytes22"` \| `"bytes23"` \| `"bytes24"` \| `"bytes25"` \| `"bytes26"` \| `"bytes27"` \| `"bytes28"` \| `"bytes29"` \| `"bytes30"` \| `"bytes31"` \| `"bytes32"` \| `"bytes32[]"` \| `"address"` \| `"address payable"` \| `"address[4]"` \| `"address[100]"` \| `"uint256"` \| `"uint256[100]"` \| `"uint8"` \| `"uint32"` \| `string`

#### Defined in

[src/types/Contract.types.ts:1](https://github.com/Earnifi/essential-eth/blob/142e41f/src/types/Contract.types.ts#L1)

---

### JSONABI

Ƭ **JSONABI**: [`JSONABIArgument`](interfaces/JSONABIArgument.md)[]

#### Defined in

[src/types/Contract.types.ts:67](https://github.com/Earnifi/essential-eth/blob/142e41f/src/types/Contract.types.ts#L67)

## Functions

### etherToWei

▸ **etherToWei**(`etherQuantity`): [`TinyBig`](classes/TinyBig.md)

Similar to ["parseEther" in ethers.js](https://docs.ethers.io/v4/api-utils.html#ether-strings-and-wei)

Similar to ["toWei" in web3](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html?highlight=towei#towei)

**`example`**

```javascript
etherToWei('1000').toString();
// '1000000000000000000000'
etherToWei(1000).toString();
// '1000000000000000000000'
```

**`example`**

```javascript
etherToWei('1000').toNumber();
// 1000000000000000000000
etherToWei(1000).toNumber();
// 1000000000000000000000
```

#### Parameters

| Name            | Type                                                             |
| :-------------- | :--------------------------------------------------------------- |
| `etherQuantity` | `string` \| `number` \| [`TinyBig`](classes/TinyBig.md) \| `Big` |

#### Returns

[`TinyBig`](classes/TinyBig.md)

#### Defined in

[src/utils/ether-to-wei.ts:26](https://github.com/Earnifi/essential-eth/blob/142e41f/src/utils/ether-to-wei.ts#L26)

---

### isAddress

▸ **isAddress**(`address`): `boolean`

Returns a boolean as to whether the input is a valid address.
Does NOT support ICAP addresses

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `address` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/is-address.ts:8](https://github.com/Earnifi/essential-eth/blob/142e41f/src/utils/is-address.ts#L8)

---

### jsonRpcProvider

▸ **jsonRpcProvider**(`rpcUrl?`): [`JsonRpcProvider`](classes/JsonRpcProvider.md)

Helper function to avoid "new"

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `rpcUrl?` | `string` |

#### Returns

[`JsonRpcProvider`](classes/JsonRpcProvider.md)

#### Defined in

[src/providers/JsonRpcProvider.ts:82](https://github.com/Earnifi/essential-eth/blob/142e41f/src/providers/JsonRpcProvider.ts#L82)

---

### tinyBig

▸ **tinyBig**(`value`): [`TinyBig`](classes/TinyBig.md)

Helper factory function so that you don't have to type "new" when instantiating a new TinyBig

#### Parameters

| Name    | Type                                                             |
| :------ | :--------------------------------------------------------------- |
| `value` | `string` \| `number` \| [`TinyBig`](classes/TinyBig.md) \| `Big` |

#### Returns

[`TinyBig`](classes/TinyBig.md)

#### Defined in

[src/shared/tiny-big/tiny-big.ts:34](https://github.com/Earnifi/essential-eth/blob/142e41f/src/shared/tiny-big/tiny-big.ts#L34)

---

### toChecksumAddress

▸ **toChecksumAddress**(`address`): `string`

Returns an Ethereum address in proper mixed-case checksum.
Does NOT support ICAP

**`example`**

```javascript
toChecksumAddress('0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359');
// '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'
```

Similar to ["getAddress" in ethers.js](https://docs.ethers.io/v4/api-utils.html#utils-getaddress)

Similar to ["toChecksumAddress" in web3](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#tochecksumaddress)

#### Parameters

| Name      | Type     | Description                                                    |
| :-------- | :------- | :------------------------------------------------------------- |
| `address` | `string` | An Ethereum address. Mixed, lower, and uppercase are all valid |

#### Returns

`string`

#### Defined in

[src/utils/to-checksum-address.ts:20](https://github.com/Earnifi/essential-eth/blob/142e41f/src/utils/to-checksum-address.ts#L20)

---

### weiToEther

▸ **weiToEther**(`weiQuantity`): [`TinyBig`](classes/TinyBig.md)

Convert from Ether to Wei

Similar to ["formatEther" in ethers.js](https://docs.ethers.io/v4/api-utils.html#ether-strings-and-wei)

Similar to ["fromWei" in web3](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#fromwei)

**`example`**

```javascript
etherToWei('1000').toString();
// '1000000000000000000000'
etherToWei(1000).toString();
('1000000000000000000000');
```

**`example`**

```javascript
etherToWei('1000').toNumber();
// 1000000000000000000000
etherToWei(1000).toNumber();
// 1000000000000000000000
```

#### Parameters

| Name          | Type                                                             |
| :------------ | :--------------------------------------------------------------- |
| `weiQuantity` | `string` \| `number` \| [`TinyBig`](classes/TinyBig.md) \| `Big` |

#### Returns

[`TinyBig`](classes/TinyBig.md)

#### Defined in

[src/utils/wei-to-ether.ts:29](https://github.com/Earnifi/essential-eth/blob/142e41f/src/utils/wei-to-ether.ts#L29)
