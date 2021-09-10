import Big from "big.js";

// https://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript/1685917
const stripScientificNotation = (num: number) =>
  num.toLocaleString("fullwide", { useGrouping: false });

// called "formatEther" in ethers.js https://docs.ethers.io/v4/api-utils.html#ether-strings-and-wei
// called "fromWei" in web3 https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#fromwei
export const weiToEther = (weiQuantity: string | number) => {
  if (!["string", "number"].includes(typeof weiQuantity)) {
    throw new Error(
      "String or number required. Received " + typeof weiQuantity
    );
  }
  // return new Decimal(etherQuantity).mul("1000000000000000000").toNumber();
  const result = Big(weiQuantity).div("1000000000000000000").toNumber();
  // return result;
  return stripScientificNotation(result); // otherwise we return things like "1e+21"
};
