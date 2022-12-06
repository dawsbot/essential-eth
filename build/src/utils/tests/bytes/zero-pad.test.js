"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _bytes = require("../../bytes");
describe('utils.zeroPad', ()=>{
    it('should match ethers.js - hex string', ()=>{
        const values = [
            [
                '0x9347',
                10
            ],
            [
                '0x185754',
                5
            ],
            [
                '0x00005823',
                7
            ]
        ];
        values.forEach((value)=>{
            expect((0, _bytes.zeroPad)(value[0], value[1])).toStrictEqual(_ethers.utils.zeroPad(value[0], value[1]));
        });
    });
    it('should match ethers.js - UInt8Array', ()=>{
        const values = [
            [
                [
                    9,
                    58,
                    29,
                    24
                ],
                5
            ],
            [
                [
                    185,
                    203
                ],
                4
            ],
            [
                [
                    239,
                    30,
                    49,
                    41,
                    5,
                    10,
                    42
                ],
                10
            ]
        ];
        values.forEach((value)=>{
            expect((0, _bytes.zeroPad)(value[0], value[1])).toStrictEqual(_ethers.utils.zeroPad(value[0], value[1]));
        });
    });
    it('should throw error - value out of range', ()=>{
        const values = [
            [
                [
                    9,
                    58,
                    29,
                    24
                ],
                3
            ],
            [
                '0x185754',
                1
            ]
        ];
        values.forEach((value)=>{
            expect(()=>(0, _bytes.zeroPad)(value[0], value[1])).toThrow('value out of range');
        });
    });
});
