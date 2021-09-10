import { etherToWei } from "./../src";

test("ether-to-wei happy path", () => {
  expect(etherToWei("1000.0").toString()).toEqual("1000000000000000000000");
  expect(etherToWei(10)).toEqual("10000000000000000000");

  expect(etherToWei("100")).toEqual("100000000000000000000");
  expect(etherToWei(100)).toEqual("100000000000000000000");
  expect(etherToWei("1000")).toEqual("1000000000000000000000");
  expect(etherToWei(1000)).toEqual("1000000000000000000000");
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
