function stripTrailingZeroes(numberString: string) {
  numberString = numberString.replace(
    /\.0*$/g,
    "" /* for numbers like "1.0" -> "1" */,
  );
  // for numbers like "1.10" -> "1.1"
  const result = /(.*\.0*[1-9]+)0*/.exec(numberString);
  let toReturn;
  if (result !== null) {
    toReturn = result[1];
  } else {
    toReturn = numberString;
  }
  if (toReturn.startsWith(".")) {
    return `0${toReturn}`;
  } else {
    return toReturn;
  }
}

export function scientificStrToDecimalStr(scientificString: string): string {
  // Does not contain "e" nor "E"
  if (!scientificString.match(/e/i /* lowercase and uppercase E */)) {
    return scientificString;
  }

  let [base, power] = scientificString.split(
    /e/i /* lowercase and uppercase E */,
  );
  const [wholeNumber, fraction /* move decimal this many places */] =
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
    const splitBase = base.split("");
    if (Number(power) < 0) {
      if (wholeNumber.length < Math.abs(Number(power))) {
        //       splitPaddedNumber = Array()
        const baseLength = base.length;

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
          // wholeNumber.length - Math.abs(Number(power)),
          0,
          ".",
        );
      }
      //       console.log({ paddedNumber });

      return stripTrailingZeroes(splitPaddedNumber.join(""));
      // move decimal left
    } else {
      // move decimal right
    }
    return "not setup";
  }
}
