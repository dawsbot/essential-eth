import Big from "big.js";
import { validateType } from "./shared/validate-type";

/**
 * Named ["formatEther" in ethers.js](https://docs.ethers.io/v4/api-utils.html#ether-strings-and-wei)
 *
 * Named ["fromWei" in web3](https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#fromwei)
 *
 * @example
 * ```javascript
 * expect(etherToWei("1000").toString()).toEqual("1000000000000000000000");
 * expect(etherToWei(1000).toString()).toEqual("1000000000000000000000");
 * ```
 *
 * @example
 * ```javascript
 * expect(etherToWei("1000").toNumber()).toEqual(1000000000000000000000);
 * expect(etherToWei(1000).toNumber()).toEqual(1000000000000000000000);
 * ```
 */
export function weiToEther(weiQuantity: string | number) {
  validateType(weiQuantity, ["string", "number"]);
  return Big(weiQuantity).div("1000000000000000000");
  // console.log({ result });
  // return tinyBig(result);
  // const result = Big(weiQuantity).div("1000000000000000000").toString();
  // console.log({ result });
  // return tinyBig(result);
}
