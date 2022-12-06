"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _bytes = require("../../bytes");
describe('utils.isHexString', ()=>{
    it('should match ethers.js - hex string', ()=>{
        const values = [
            '0x9347',
            '0x185754',
            '0x00005823'
        ];
        values.forEach((value)=>{
            expect((0, _bytes.isHexString)(value)).toBe(_ethers.utils.isHexString(value));
        });
    });
    it('should match ethers.js - hex string of specific length', ()=>{
        const values = [
            [
                '0x9347',
                2
            ],
            [
                '0x185754',
                5
            ],
            [
                '0x00005823',
                4
            ]
        ];
        values.forEach((value)=>{
            expect((0, _bytes.isHexString)(value[0], value[1])).toBe(_ethers.utils.isHexString(value[0], value[1]));
        });
    });
    it('should match ethers.js - UInt8Array', ()=>{
        const values = [
            [
                9,
                58,
                29,
                24
            ],
            [
                185,
                203
            ],
            [
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
            expect((0, _bytes.isHexString)(value)).toBe(_ethers.utils.isHexString(value));
        });
    });
    it('should match ethers.js - number', ()=>{
        const values = [
            152,
            513,
            2354
        ];
        values.forEach((value)=>{
            expect((0, _bytes.isHexString)(value)).toBe(_ethers.utils.isHexString(value));
        });
    });
    it('should match ethers.js - non-hex string', ()=>{
        const values = [
            'essential-eth',
            'ethers.js',
            'ethereum'
        ];
        values.forEach((value)=>{
            expect((0, _bytes.isHexString)(value)).toBe(_ethers.utils.isHexString(value));
        });
    });
    it('should match ethers.js - boolean', ()=>{
        const values = [
            false,
            true
        ];
        values.forEach((value)=>{
            expect((0, _bytes.isHexString)(value)).toBe(_ethers.utils.isHexString(value));
        });
    });
});
