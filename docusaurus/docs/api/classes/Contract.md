---
id: "Contract"
title: "Class: Contract"
sidebar_label: "Contract"
sidebar_position: 0
custom_edit_url: null
---

Only accepts ABIS in JSON format. This allows for stronger typing and assurances of data-types

**`example`**
```typescript
import { Contract, JsonRpcProvider } from 'essential-eth';
// UNI airdrop contract
const contractAddress = '0x090D4613473dEE047c3f2706764f49E0821D256e';
const provider = new JsonRpcProvider();

const JSONABI = [
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
]

const contract = new Contract(
  contractAddress,
  JSONABI,
  provider,
);

(async () => {
  // prints boolean as to whether index 0 has claimed airdrop or not
  console.log(await contract.isClaimed(0));
})()

```

## Hierarchy

- `BaseContract`

  ↳ **`Contract`**

## Indexable

▪ [key: `string`]: `any`

The dynamic contract calls on any given contract. Like "isClaimed", "merkleRoot", etc.

## Constructors

### constructor

• **new Contract**(`addressOrName`, `contractInterface`, `signerOrProvider`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `addressOrName` | `string` | The ethereum address of the smart-contract |
| `contractInterface` | [`JSONABI`](../modules.md#jsonabi) | The JSON ABI of the smart-contract (like http://api.etherscan.io/api?module=contract&action=getabi&address=0x090d4613473dee047c3f2706764f49e0821d256e&format=raw) |
| `signerOrProvider` | [`JsonRpcProvider`](JsonRpcProvider.md) | An instantiated essential-eth provider |

#### Inherited from

BaseContract.constructor

#### Defined in

[src/classes/Contract.ts:31](https://github.com/Earnifi/essential-eth/blob/2d97564/src/classes/Contract.ts#L31)
