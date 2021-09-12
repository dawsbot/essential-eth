import * as ethers from "ethers";
import web3 from "web3";
import { weiToEther } from "./../src";

test("happy path", () => {
  expect(weiToEther("100000000000000000000.0").toString()).toEqual("100");
  expect(weiToEther(100000000000000000000.0).toString()).toEqual("100");
  expect(weiToEther("1000000000000000000000.0").toNumber()).toEqual(1000);
  expect(weiToEther(1000000000000000000000.0).toNumber()).toEqual(1000);
});

test.only("Matches ethers and web3 toString", () => {
  expect(weiToEther("10").toString()).toEqual("0.00000000000000001");
  // ethers.utils.formatEther("10"));
  expect(weiToEther("10").toString()).toEqual("1e-17");
  expect(weiToEther("1000000000000000000000").toString()).toEqual("1000");
  // as soon as this test turns false, the next line can be uncommented and this should be deleted.
  // Ethers.js should change this,
  expect(ethers.utils.formatEther("1000000000000000000000").toString()).toEqual(
    "1000.0" /* should be "1000" */,
  );
  // expect(weiToEther("1000000000000000000000").toString()).toEqual(
  //   // ethers loses precision badly here. They return "0.000000000000009999"
  //   ethers.utils.formatEther("1000000000000000000000").toString(),
  // );

  expect(weiToEther("9999").toString()).toEqual("0.000000000000009999");
  expect(web3.utils.fromWei("9999", "ether").toString()).toEqual("0");
  // expect(weiToEther("9999").toString()).toEqual(
  //   web3.utils.fromWei("9999", "ether"),
  // );
});

test("Matches ethers and web3 toNumber", () => {
  /* easy */
  expect(weiToEther("9").toNumber()).toEqual(
    Number(ethers.utils.formatEther("9")),
  );
  expect(weiToEther("9").toNumber()).toEqual(
    Number(web3.utils.fromWei("9", "ether")),
  );

  /* hard because they respond with scientific notation or overflowing */
  expect(weiToEther("999999.9").toNumber()).toEqual(
    Number(
      ethers.utils.formatEther("999999.9"),
    ) /* overflow error if you use the ".toNumber()", */,
  );
  expect(weiToEther("999999.9").toNumber()).toEqual(
    Number(web3.utils.fromWei("999999.9", "ether")),
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
