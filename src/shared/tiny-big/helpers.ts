// strips both leading and trailing zeroes
function stripTrailingZeroes(numberString: string) {
  const isNegative = numberString.startsWith("-");
  numberString = numberString.replace("-", "");

  numberString = numberString.replace(
    /\.0*$/g,
    "" /* for numbers like "1.0" -> "1" */,
  );
  numberString = numberString.replace(/^0+/, "");
  // for numbers like "1.10" -> "1.1"
  if (numberString.includes(".")) {
    numberString = numberString.replace(/0+$/, "");
  }
  if (numberString.startsWith(".")) {
    // so that ".1" returns as "0.1"
    numberString = `0${numberString}`;
  }
  return `${isNegative ? "-" : ""}${numberString}`;
}

export function scientificStrToDecimalStr(scientificString: string): string {
  // Does not contain "e" nor "E"
  if (!scientificString.match(/e/i /* lowercase and uppercase E */)) {
    return stripTrailingZeroes(scientificString);
  }

  let [base, power] = scientificString.split(
    /e/i /* lowercase and uppercase E */,
  );
  const [wholeNumber, fraction /* move decimal this many places */ = ""] =
    base.split(".");
  if (Number(power) === 0) {
    return stripTrailingZeroes(base);
  } else {
    const isNegative = Number(base) < 0;
    const includesDecimal = base.includes(".");
    if (!includesDecimal) {
      base = `${base}.`;
    }
    const decimalIndex = base.indexOf(".");
    base = base.replace(".", "");
    const baseLength = base.length;
    if (Number(power) < 0) {
      // move decimal left
      if (wholeNumber.length < Math.abs(Number(power))) {
        base = base.padStart(
          baseLength + Math.abs(Number(power)) - wholeNumber.length,
          "0",
        );
      }
      let splitPaddedNumber = base.split("");
      if (wholeNumber.length < Math.abs(Number(power))) {
        // starts with zeroes
        splitPaddedNumber = [".", ...splitPaddedNumber];
      } else {
        splitPaddedNumber.splice(
          splitPaddedNumber.length - Math.abs(Number(power)),
          0,
          ".",
        );
      }
      return stripTrailingZeroes(splitPaddedNumber.join(""));
    } else {
      if (fraction.length < Math.abs(Number(power))) {
        base = base.padEnd(
          baseLength + Math.abs(Number(power)) - fraction.length,
          "0",
        );
      }
      let splitPaddedNumber = base.split("");
      if (fraction.length > Math.abs(Number(power))) {
        splitPaddedNumber.splice(
          splitPaddedNumber.length - Math.abs(Number(power)),
          0,
          ".",
        );
      }
      return stripTrailingZeroes(splitPaddedNumber.join(""));
      // move decimal right
    }
  }
}
