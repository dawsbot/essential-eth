"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _bytes = require("../../bytes");
describe('utils.stripZeros', ()=>{
    it('should match ethers.js - hex string', ()=>{
        const values = [
            '0x00009347',
            '0x00185754',
            '0x00000000005823'
        ];
        values.forEach((value)=>{
            expect((0, _bytes.stripZeros)(value)).toStrictEqual(_ethers.utils.stripZeros(value));
        });
    });
    it('should match ethers.js - UInt8Array', ()=>{
        const values = [
            [
                0,
                0,
                0,
                9,
                58,
                29,
                24
            ],
            [
                0,
                185,
                203
            ],
            [
                0,
                0,
                0,
                0,
                239,
                30,
                49,
                41,
                5,
                10,
                42
            ]
        ];
        values.forEach((value)=>{
            expect((0, _bytes.stripZeros)(value)).toStrictEqual(_ethers.utils.stripZeros(value));
        });
    });
    it('should match ethers.js - empty array', ()=>{
        const values = [
            [],
            '0x'
        ];
        values.forEach((value)=>{
            expect((0, _bytes.stripZeros)(value)).toStrictEqual(_ethers.utils.stripZeros(value));
        });
    });
});
