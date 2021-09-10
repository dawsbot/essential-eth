import { weiToEther } from "../src";

test("ether-to-wei happy path", () => {
  expect(weiToEther("100000000000000000000")).toEqual("100");
  expect(weiToEther(100000000000000000000)).toEqual("100");
  expect(weiToEther("1e+21")).toEqual("1000");
  expect(weiToEther(1e21)).toEqual("1000");
});

test("ether-to-wei wrong types", () => {
  expect(() => {
    // @ts-expect-error
    etherToWei(false);
  }).toThrow();
  expect(() => {
    // @ts-expect-error
    etherToWei([1, 2, 3]);
  }).toThrow();
});
