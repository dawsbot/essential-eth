"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _tinyBig = require("./tiny-big");
describe('tiny-big', ()=>{
    it('allows hex string input', ()=>{
        expect((0, _tinyBig.tinyBig)('0xa').toString()).toBe('10');
        expect((0, _tinyBig.tinyBig)('10').toString()).toBe('10');
    });
    it('performs toHexString properly', ()=>{
        expect((0, _tinyBig.tinyBig)(0).toHexString()).toBe('0x0');
        expect((0, _tinyBig.tinyBig)(1).toHexString()).toBe('0x1');
        expect((0, _tinyBig.tinyBig)(15).toHexString()).toBe('0xf');
        expect((0, _tinyBig.tinyBig)(16).toHexString()).toBe('0x10');
    });
    it('performs twosComplement', ()=>{
        const inputs = [
            {
                num: -3,
                bitCount: 3
            },
            {
                num: 0,
                bitCount: 3
            },
            {
                num: 3,
                bitCount: 3
            }
        ];
        inputs.forEach(({ num , bitCount  })=>{
            expect((0, _tinyBig.tinyBig)(num).toTwos(bitCount).toString()).toBe(_ethers.BigNumber.from(num).toTwos(bitCount).toString());
        });
    });
});
