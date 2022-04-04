---
id: "JsonRpcProvider"
title: "Class: JsonRpcProvider"
sidebar_label: "JsonRpcProvider"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new JsonRpcProvider**(`rpcUrl?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rpcUrl?` | `string` |

#### Defined in

[src/providers/JsonRpcProvider.ts:13](https://github.com/Earnifi/essential-eth/blob/2d97564/src/providers/JsonRpcProvider.ts#L13)

## Properties

### \_rpcUrl

• `Readonly` **\_rpcUrl**: `string`

The URL to your Eth node. Consider POKT or Infura

#### Defined in

[src/providers/JsonRpcProvider.ts:12](https://github.com/Earnifi/essential-eth/blob/2d97564/src/providers/JsonRpcProvider.ts#L12)

## Methods

### getBlock

▸ **getBlock**(`timeFrame`, `returnTransactionObjects?`): `Promise`<[`Block`](../interfaces/Block.md)\>

Returns the block requested
Same as `web3.eth.getBlock`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `timeFrame` | `number` \| ``"latest"`` \| ``"earliest"`` \| ``"pending"`` | `undefined` |
| `returnTransactionObjects` | `boolean` | `false` |

#### Returns

`Promise`<[`Block`](../interfaces/Block.md)\>

#### Defined in

[src/providers/JsonRpcProvider.ts:21](https://github.com/Earnifi/essential-eth/blob/2d97564/src/providers/JsonRpcProvider.ts#L21)

___

### getGasPrice

▸ **getGasPrice**(): `Promise`<[`TinyBig`](TinyBig.md)\>

Returns the current gas price in wei as TinyBig
Same as `ethers.provider.getGasPrice`

#### Returns

`Promise`<[`TinyBig`](TinyBig.md)\>

#### Defined in

[src/providers/JsonRpcProvider.ts:70](https://github.com/Earnifi/essential-eth/blob/2d97564/src/providers/JsonRpcProvider.ts#L70)

___

### getNetwork

▸ **getNetwork**(): `Promise`<[`Network`](../interfaces/Network.md)\>

Returns the network this provider is connected to

#### Returns

`Promise`<[`Network`](../interfaces/Network.md)\>

#### Defined in

[src/providers/JsonRpcProvider.ts:53](https://github.com/Earnifi/essential-eth/blob/2d97564/src/providers/JsonRpcProvider.ts#L53)
