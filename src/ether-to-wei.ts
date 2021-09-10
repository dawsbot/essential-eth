import Big from "big.js";

// https://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript/1685917
const stripScientificNotation = (num: number) =>
  num.toLocaleString("fullwide", { useGrouping: false });

// called "parseEther" in ethers.js https://docs.ethers.io/v4/api-utils.html#ether-strings-and-wei
// called "toWei" in web3 https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html?highlight=towei#towei
export const etherToWei = (etherQuantity: string | number) => {
  if (!["string", "number"].includes(typeof etherQuantity)) {
    throw new Error(
      "String or number required. Received " + typeof etherQuantity,
    );
  }
  // return new Decimal(etherQuantity).mul("1000000000000000000").toNumber();
  const result = Big(etherQuantity).times("1000000000000000000").toNumber();
  // return result;
  return stripScientificNotation(result); // otherwise we return things like "1e+21"
};
