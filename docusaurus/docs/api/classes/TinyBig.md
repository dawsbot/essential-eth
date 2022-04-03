---
id: 'TinyBig'
title: 'Class: TinyBig'
sidebar_label: 'TinyBig'
sidebar_position: 0
custom_edit_url: null
---

A wrapper around big.js which expands scientific notation and creates a "toHexString" function.
This is the return type of every operation on ether, wei, etc.

## Hierarchy

- `Big`

  ↳ **`TinyBig`**

## Constructors

### constructor

• **new TinyBig**(`value`)

#### Parameters

| Name    | Type                                                     |
| :------ | :------------------------------------------------------- |
| `value` | `string` \| `number` \| [`TinyBig`](TinyBig.md) \| `Big` |

#### Overrides

Big.constructor

#### Defined in

[src/shared/tiny-big/tiny-big.ts:9](https://github.com/Earnifi/essential-eth/blob/142e41f/src/shared/tiny-big/tiny-big.ts#L9)

## Properties

### c

• **c**: `number`[]

Returns an array of single digits

#### Inherited from

Big.c

#### Defined in

node_modules/@types/big.js/index.d.ts:371

---

### e

• **e**: `number`

Returns the exponent, Integer, -1e+6 to 1e+6 inclusive

#### Inherited from

Big.e

#### Defined in

node_modules/@types/big.js/index.d.ts:375

---

### s

• **s**: `number`

Returns the sign, -1 or 1

#### Inherited from

Big.s

#### Defined in

node_modules/@types/big.js/index.d.ts:379

---

### DP

▪ `Static` **DP**: `number`

The maximum number of decimal places of the results of operations involving division.
It is relevant only to the div and sqrt methods, and the pow method when the exponent is negative.

0 to 1e+6 inclusive
Default value: 20

#### Inherited from

Big.DP

#### Defined in

node_modules/@types/big.js/index.d.ts:109

---

### NE

▪ `Static` **NE**: `number`

The negative exponent value at and below which toString returns exponential notation.

-1e+6 to 0 inclusive
Default value: -7

#### Inherited from

Big.NE

#### Defined in

node_modules/@types/big.js/index.d.ts:121

---

### PE

▪ `Static` **PE**: `number`

The positive exponent value at and above which toString returns exponential notation.

0 to 1e+6 inclusive
Default value: 21

#### Inherited from

Big.PE

#### Defined in

node_modules/@types/big.js/index.d.ts:128

---

### RM

▪ `Static` **RM**: `number`

The rounding mode used in the above operations and by round, toExponential, toFixed and toPrecision.
Default value: 1

#### Inherited from

Big.RM

#### Defined in

node_modules/@types/big.js/index.d.ts:114

---

### roundDown

▪ `Static` `Readonly` **roundDown**: `0`

Rounds towards zero.
I.e. truncate, no rounding.

#### Inherited from

Big.roundDown

#### Defined in

node_modules/@types/big.js/index.d.ts:136

---

### roundHalfEven

▪ `Static` `Readonly` **roundHalfEven**: `2`

Rounds towards nearest neighbour.
If equidistant, rounds towards even neighbour.

#### Inherited from

Big.roundHalfEven

#### Defined in

node_modules/@types/big.js/index.d.ts:146

---

### roundHalfUp

▪ `Static` `Readonly` **roundHalfUp**: `1`

Rounds towards nearest neighbour.
If equidistant, rounds away from zero.

#### Inherited from

Big.roundHalfUp

#### Defined in

node_modules/@types/big.js/index.d.ts:141

---

### roundUp

▪ `Static` `Readonly` **roundUp**: `3`

Rounds away from zero.

#### Inherited from

Big.roundUp

#### Defined in

node_modules/@types/big.js/index.d.ts:150

## Methods

### abs

▸ **abs**(): `Big`

Returns a Big number whose value is the absolute value, i.e. the magnitude, of this Big number.

#### Returns

`Big`

#### Inherited from

Big.abs

#### Defined in

node_modules/@types/big.js/index.d.ts:155

---

### add

▸ **add**(`n`): `Big`

Returns a Big number whose value is the value of this Big number plus n - alias for .plus().

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`Big`

#### Inherited from

Big.add

#### Defined in

node_modules/@types/big.js/index.d.ts:161

---

### cmp

▸ **cmp**(`n`): `Comparison`

Compare the values.

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`Comparison`

#### Inherited from

Big.cmp

#### Defined in

node_modules/@types/big.js/index.d.ts:167

---

### div

▸ **div**(`n`): `Big`

Returns a Big number whose value is the value of this Big number divided by n.

If the result has more fraction digits than is specified by Big.DP, it will be rounded to Big.DP decimal places using rounding mode Big.RM.

**`throws`** `NaN` if n is invalid.

**`throws`** `±Infinity` on division by zero.

**`throws`** `NaN` on division of zero by zero.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`Big`

#### Inherited from

Big.div

#### Defined in

node_modules/@types/big.js/index.d.ts:177

---

### eq

▸ **eq**(`n`): `boolean`

Returns true if the value of this Big equals the value of n, otherwise returns false.

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`boolean`

#### Inherited from

Big.eq

#### Defined in

node_modules/@types/big.js/index.d.ts:183

---

### gt

▸ **gt**(`n`): `boolean`

Returns true if the value of this Big is greater than the value of n, otherwise returns false.

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`boolean`

#### Inherited from

Big.gt

#### Defined in

node_modules/@types/big.js/index.d.ts:189

---

### gte

▸ **gte**(`n`): `boolean`

Returns true if the value of this Big is greater than or equal to the value of n, otherwise returns false.

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`boolean`

#### Inherited from

Big.gte

#### Defined in

node_modules/@types/big.js/index.d.ts:195

---

### lt

▸ **lt**(`n`): `boolean`

Returns true if the value of this Big is less than the value of n, otherwise returns false.

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`boolean`

#### Inherited from

Big.lt

#### Defined in

node_modules/@types/big.js/index.d.ts:201

---

### lte

▸ **lte**(`n`): `boolean`

Returns true if the value of this Big is less than or equal to the value of n, otherwise returns false.

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`boolean`

#### Inherited from

Big.lte

#### Defined in

node_modules/@types/big.js/index.d.ts:207

---

### minus

▸ **minus**(`n`): `Big`

Returns a Big number whose value is the value of this Big number minus n.

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`Big`

#### Inherited from

Big.minus

#### Defined in

node_modules/@types/big.js/index.d.ts:213

---

### mod

▸ **mod**(`n`): `Big`

Returns a Big number whose value is the value of this Big number modulo n, i.e. the integer remainder of dividing this Big number by n.

The result will have the same sign as this Big number, and it will match that of Javascript's % operator (within the limits of its precision) and BigDecimal's remainder method.

**`throws`** `NaN` if n is negative or otherwise invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`Big`

#### Inherited from

Big.mod

#### Defined in

node_modules/@types/big.js/index.d.ts:221

---

### mul

▸ **mul**(`n`): `Big`

Returns a Big number whose value is the value of this Big number times n - alias for .times().

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`Big`

#### Inherited from

Big.mul

#### Defined in

node_modules/@types/big.js/index.d.ts:227

---

### plus

▸ **plus**(`n`): `Big`

Returns a Big number whose value is the value of this Big number plus n.

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`Big`

#### Inherited from

Big.plus

#### Defined in

node_modules/@types/big.js/index.d.ts:233

---

### pow

▸ **pow**(`exp`): `Big`

Returns a Big number whose value is the value of this Big number raised to the power exp.

If exp is negative and the result has more fraction digits than is specified by Big.DP, it will be rounded to Big.DP decimal places using rounding mode Big.RM.

**`throws`** `!pow!` if exp is invalid.

Note: High value exponents may cause this method to be slow to return.

#### Parameters

| Name  | Type     | Description                                               |
| :---- | :------- | :-------------------------------------------------------- |
| `exp` | `number` | The power to raise the number to, -1e+6 to 1e+6 inclusive |

#### Returns

`Big`

#### Inherited from

Big.pow

#### Defined in

node_modules/@types/big.js/index.d.ts:244

---

### prec

▸ **prec**(`sd`, `rm?`): `Big`

Return a new Big whose value is the value of this Big rounded to a maximum precision of sd
significant digits using rounding mode rm, or Big.RM if rm is not specified.

**`throws`** `!prec!` if sd is invalid.

**`throws`** `!Big.RM!` if rm is invalid.

#### Parameters

| Name  | Type           | Description                                                    |
| :---- | :------------- | :------------------------------------------------------------- |
| `sd`  | `number`       | Significant digits: integer, 1 to MAX_DP inclusive.            |
| `rm?` | `RoundingMode` | Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up). |

#### Returns

`Big`

#### Inherited from

Big.prec

#### Defined in

node_modules/@types/big.js/index.d.ts:254

---

### round

▸ **round**(`dp?`, `rm?`): `Big`

Returns a Big number whose value is the value of this Big number rounded using rounding mode rm to a maximum of dp decimal places.

**`throws`** `!round!` if dp is invalid.

**`throws`** `!Big.RM!` if rm is invalid.

#### Parameters

| Name  | Type           | Description                                                    |
| :---- | :------------- | :------------------------------------------------------------- |
| `dp?` | `number`       | Decimal places, 0 to 1e+6 inclusive                            |
| `rm?` | `RoundingMode` | Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up). |

#### Returns

`Big`

#### Inherited from

Big.round

#### Defined in

node_modules/@types/big.js/index.d.ts:263

---

### sqrt

▸ **sqrt**(): `Big`

Returns a Big number whose value is the square root of this Big number.

If the result has more fraction digits than is specified by Big.DP, it will be rounded to Big.DP decimal places using rounding mode Big.RM.

**`throws`** `NaN` if this Big number is negative.

#### Returns

`Big`

#### Inherited from

Big.sqrt

#### Defined in

node_modules/@types/big.js/index.d.ts:271

---

### sub

▸ **sub**(`n`): `Big`

Returns a Big number whose value is the value of this Big number minus n - alias for .minus().

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`Big`

#### Inherited from

Big.sub

#### Defined in

node_modules/@types/big.js/index.d.ts:277

---

### times

▸ **times**(`n`): `Big`

Returns a Big number whose value is the value of this Big number times n.

**`throws`** `NaN` if n is invalid.

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `n`  | `BigSource` |

#### Returns

`Big`

#### Inherited from

Big.times

#### Defined in

node_modules/@types/big.js/index.d.ts:283

---

### toExponential

▸ **toExponential**(`dp?`, `rm?`): `string`

Returns a string representing the value of this Big number in exponential notation to a fixed number of decimal places dp.

If the value of this Big number in exponential notation has more digits to the right of the decimal point than is specified by dp,
the return value will be rounded to dp decimal places using rounding mode Big.RM.

If the value of this Big number in exponential notation has fewer digits to the right of the decimal point than is specified by dp, the return value will be appended with zeros accordingly.

If dp is omitted, or is null or undefined, the number of digits after the decimal point defaults to the minimum number of digits necessary to represent the value exactly.

**`throws`** `!toFix!` if dp is invalid.

#### Parameters

| Name  | Type           | Description                                                    |
| :---- | :------------- | :------------------------------------------------------------- |
| `dp?` | `number`       | Decimal places, 0 to 1e+6 inclusive                            |
| `rm?` | `RoundingMode` | Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up). |

#### Returns

`string`

#### Inherited from

Big.toExponential

#### Defined in

node_modules/@types/big.js/index.d.ts:298

---

### toFixed

▸ **toFixed**(`dp?`, `rm?`): `string`

Returns a string representing the value of this Big number in normal notation to a fixed number of decimal places dp.

If the value of this Big number in normal notation has more digits to the right of the decimal point than is specified by dp,
the return value will be rounded to dp decimal places using rounding mode Big.RM.

If the value of this Big number in normal notation has fewer fraction digits then is specified by dp, the return value will be appended with zeros accordingly.

Unlike Number.prototype.toFixed, which returns exponential notation if a number is greater or equal to 1021, this method will always return normal notation.

If dp is omitted, or is null or undefined, then the return value is simply the value in normal notation.
This is also unlike Number.prototype.toFixed, which returns the value to zero decimal places.

**`throws`** `!toFix!` if dp is invalid.

#### Parameters

| Name  | Type           | Description                                                    |
| :---- | :------------- | :------------------------------------------------------------- |
| `dp?` | `number`       | Decimal places, 0 to 1e+6 inclusive                            |
| `rm?` | `RoundingMode` | Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up). |

#### Returns

`string`

#### Inherited from

Big.toFixed

#### Defined in

node_modules/@types/big.js/index.d.ts:316

---

### toHexString

▸ **toHexString**(): `string`

Used anytime you're passing in "value" to ethers or web3
For now, TypeScript will complain that `TinyBig` is not a `BigNumberish`. You can // @ts-ignore or call this

#### Returns

`string`

#### Defined in

[src/shared/tiny-big/tiny-big.ts:16](https://github.com/Earnifi/essential-eth/blob/142e41f/src/shared/tiny-big/tiny-big.ts#L16)

---

### toJSON

▸ **toJSON**(): `string`

Returns a string representing the value of this Big number.

If this Big number has a positive exponent that is equal to or greater than 21, or a negative exponent equal to or less than -7, then exponential notation is returned.

The point at which toString returns exponential rather than normal notation can be adjusted by changing
the value of Big.E_POS and Big.E_NEG. By default, Big numbers correspond to Javascript's number type in this regard.

#### Returns

`string`

#### Inherited from

Big.toJSON

#### Defined in

node_modules/@types/big.js/index.d.ts:367

---

### toNumber

▸ **toNumber**(): `number`

#### Returns

`number`

#### Overrides

Big.toNumber

#### Defined in

[src/shared/tiny-big/tiny-big.ts:19](https://github.com/Earnifi/essential-eth/blob/142e41f/src/shared/tiny-big/tiny-big.ts#L19)

---

### toPrecision

▸ **toPrecision**(`sd?`, `rm?`): `string`

Returns a string representing the value of this Big number to the specified number of significant digits sd.

If the value of this Big number has more digits than is specified by sd, the return value will be rounded to sd significant digits using rounding mode Big.RM.

If the value of this Big number has fewer digits than is specified by sd, the return value will be appended with zeros accordingly.

If sd is less than the number of digits necessary to represent the integer part of the value in normal notation, then exponential notation is used.

If sd is omitted, or is null or undefined, then the return value is the same as .toString().

**`throws`** `!toPre!` if sd is invalid.

#### Parameters

| Name  | Type           | Description                                                    |
| :---- | :------------- | :------------------------------------------------------------- |
| `sd?` | `number`       | Significant digits, 1 to 1e+6 inclusive                        |
| `rm?` | `RoundingMode` | Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up). |

#### Returns

`string`

#### Inherited from

Big.toPrecision

#### Defined in

node_modules/@types/big.js/index.d.ts:332

---

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

Big.toString

#### Defined in

[src/shared/tiny-big/tiny-big.ts:23](https://github.com/Earnifi/essential-eth/blob/142e41f/src/shared/tiny-big/tiny-big.ts#L23)

---

### valueOf

▸ **valueOf**(): `string`

Returns a string representing the value of this Big number.

If this Big number has a positive exponent that is equal to or greater than 21, or a negative exponent equal to or less than -7, then exponential notation is returned.

The point at which toString returns exponential rather than normal notation can be adjusted by changing
the value of Big.E_POS and Big.E_NEG. By default, Big numbers correspond to Javascript's number type in this regard.

#### Returns

`string`

#### Inherited from

Big.valueOf

#### Defined in

node_modules/@types/big.js/index.d.ts:358
