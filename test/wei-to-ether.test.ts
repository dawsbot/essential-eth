// import { weiToEther } from "../src";

// test("ether-to-wei happy path", () => {
//   expect(weiToEther("100000000000000000000")).toEqual("100");
//   expect(weiToEther(100000000000000000000)).toEqual("100");
//   expect(weiToEther("1e+21")).toEqual("1000");
//   expect(weiToEther(1e21)).toEqual("1000");
// });

// test("ether-to-wei wrong types", () => {
//   expect(() => {
//     // @ts-expect-error
//     weiToEther(false);
//   }).toThrow();
//   expect(() => {
//     // @ts-expect-error
//     weiToEther([1, 2, 3]);
//   }).toThrow();
// });

// import { formatEther } from "@ethersproject/units";
import * as ethers from "ethers";
import web3 from "web3";
import { stripScientificNotation } from "../src/shared/tiny-big";
import { weiToEther } from "./../src";

test("happy path", () => {
  expect(weiToEther("100000000000000000000.0").toString()).toEqual("100");
  expect(weiToEther(100000000000000000000.0).toString()).toEqual("100");
  expect(weiToEther("1000000000000000000000.0").toNumber()).toEqual(1000);
  expect(weiToEther(1000000000000000000000.0).toNumber()).toEqual(1000);
});

test("Matches ethers and web3 toString", () => {
  expect(weiToEther("9999").toString()).toEqual(
    ethers.utils.formatEther("9999").toString(),
  );
  expect(weiToEther("9999").toString()).toEqual(
    web3.utils.fromWei("9999", "ether"),
  );
});

test("Matches ethers and web3 toNumber", () => {
  /* easy */
  expect(weiToEther("9").toNumber()).toEqual(
    Number(ethers.utils.formatEther("9")),
  );
  // web3 responds with scientific notation
  expect(weiToEther("9").toNumber()).toEqual(
    Number(web3.utils.fromWei("9", "ether")),
  );

  /* hard because they respond with scientific notation or overflowing */
  expect(weiToEther("999999.9").toNumber()).toEqual(
    Number(
      ethers.utils.formatEther("999999.9"),
    ) /* overflow error if you use the ".toNumber()", */,
  );
  // web3 responds with scientific notation
  expect(weiToEther("999999.9").toNumber()).toEqual(
    Number(
      stripScientificNotation(Number(web3.utils.fromWei("999999.9", "ether"))),
    ),
  );
});

test("wrong types", () => {
  expect(() => {
    // @ts-expect-error
    weiToEther(false);
  }).toThrow();
  expect(() => {
    // @ts-expect-error
    weiToEther([1, 2, 3]);
  }).toThrow();
});
