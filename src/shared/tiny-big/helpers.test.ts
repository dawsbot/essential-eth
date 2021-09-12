import { scientificStrToDecimalStr } from "./helpers";

describe("scientificStrToDecimalStr", () => {
  test("not even scientific", () => {
    expect(scientificStrToDecimalStr("10")).toEqual("10");
    expect(scientificStrToDecimalStr("-10")).toEqual("-10");
  });
  test("zero power", () => {
    expect(scientificStrToDecimalStr("10e0")).toEqual("10");
    expect(scientificStrToDecimalStr("1.0e0")).toEqual("1");
    expect(scientificStrToDecimalStr("-10e-0")).toEqual("-10");
    expect(scientificStrToDecimalStr("-1.0e-0")).toEqual("-1");
    expect(scientificStrToDecimalStr("-1.10e-0")).toEqual("-1.1");
    expect(scientificStrToDecimalStr("-1.e-0")).toEqual("-1");
    expect(scientificStrToDecimalStr(".10e-0")).toEqual("0.1");
    expect(scientificStrToDecimalStr(".0010e-0")).toEqual("0.001");
  });
  test.only("negative power", () => {
    expect(scientificStrToDecimalStr("100e-2")).toEqual("1");
    expect(scientificStrToDecimalStr("100e-4")).toEqual("0.01");
    expect(scientificStrToDecimalStr("10.1e-3")).toEqual("0.0101");
  });
});
