// import { parseEther } from "@ethersproject/units";
import * as ethers from "ethers";
import web3 from "web3";
import { stripScientificNotation } from "../src/shared/tiny-big/tiny-big";
import { etherToWei } from "./../src";

test("happy path", () => {
  expect(etherToWei("100").toString()).toEqual("100000000000000000000");
  expect(etherToWei(100).toString()).toEqual("100000000000000000000");
  expect(etherToWei("1000.0").toString()).toEqual("1000000000000000000000");
  expect(etherToWei(1000).toString()).toEqual("1000000000000000000000");
  expect(etherToWei("1000.0").toNumber()).toEqual(1000000000000000000000);
});

test("Matches ethers and web3 toString", () => {
  expect(etherToWei("9999").toString()).toEqual(
    ethers.utils.parseEther("9999").toString(),
  );
  expect(etherToWei("9999").toString()).toEqual(
    web3.utils.toWei("9999", "ether"),
  );
});

test("Matches ethers and web3 toNumber", () => {
  /* easy */
  expect(etherToWei("9").toNumber()).toEqual(
    Number(ethers.utils.parseEther("9")),
  );
  // web3 responds with scientific notation
  expect(etherToWei("9").toNumber()).toEqual(
    Number(web3.utils.toWei("9", "ether")),
  );

  /* hard because they respond with scientific notation or overflowing */
  expect(etherToWei("999999.9").toNumber()).toEqual(
    Number(
      ethers.utils.parseEther("999999.9"),
    ) /* overflow error if you use the ".toNumber()", */,
  );
  // web3 responds with scientific notation
  expect(etherToWei("999999.9").toNumber()).toEqual(
    Number(
      stripScientificNotation(Number(web3.utils.toWei("999999.9", "ether"))),
    ),
  );
});

test("wrong types", () => {
  expect(() => {
    // @ts-expect-error
    etherToWei(false);
  }).toThrow();
  expect(() => {
    // @ts-expect-error
    etherToWei([1, 2, 3]);
  }).toThrow();
});
