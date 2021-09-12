import { scientificStrToDecimalStr } from "./helpers";

describe("scientificStrToDecimalStr", () => {
  test("not even scientific", () => {
    expect(scientificStrToDecimalStr("010")).toEqual("10");
    expect(scientificStrToDecimalStr("-010")).toEqual("-10");
  });
  test("zero power", () => {
    expect(scientificStrToDecimalStr("10e0")).toEqual("10");
    expect(scientificStrToDecimalStr("1.0e0")).toEqual("1");
    expect(scientificStrToDecimalStr("-10e-0")).toEqual("-10");
    expect(scientificStrToDecimalStr("-1.0e-0")).toEqual("-1");
    expect(scientificStrToDecimalStr("-1.10e-0")).toEqual("-1.1");
    expect(scientificStrToDecimalStr("-1.e-0")).toEqual("-1");
    expect(scientificStrToDecimalStr(".10e-0")).toEqual("0.1");
    expect(scientificStrToDecimalStr("00.0010e-0")).toEqual("0.001");
  });
  test("negative power", () => {
    expect(scientificStrToDecimalStr("0100e-2")).toEqual("1");
    expect(scientificStrToDecimalStr("0100e-4")).toEqual("0.01");
    expect(scientificStrToDecimalStr("010.1e-3")).toEqual("0.0101");
    expect(scientificStrToDecimalStr("010.1e-3")).toEqual("0.0101");
    expect(scientificStrToDecimalStr("09.1e-51")).toEqual(
      `0.${"0".repeat(50)}91`,
    );
  });
  test("positive power", () => {
    expect(scientificStrToDecimalStr("01e2")).toEqual("100");
    expect(scientificStrToDecimalStr("01e2")).toEqual("100");
    expect(scientificStrToDecimalStr("09.1e51")).toEqual(`91${"0".repeat(50)}`);
  });
});
