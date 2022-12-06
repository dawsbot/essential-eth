"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _bytes = require("../../bytes");
describe('utils.hexDataSlice', ()=>{
    it('numbers - matches ethers strings', ()=>{
        const decimalValues = [
            '0x123456'
        ];
        decimalValues.forEach((decimalValue)=>{
            expect((0, _bytes.hexDataSlice)(decimalValue, 0, 2)).toStrictEqual(_ethers.utils.hexDataSlice(decimalValue, 0, 2));
        });
    });
    it('numbers - matches ethers hex numbers', ()=>{
        const decimalValues = [
            0x1234567891011
        ];
        decimalValues.forEach((decimalValue)=>{
            expect((0, _bytes.hexDataSlice)(decimalValue, 3)).toStrictEqual(_ethers.utils.hexDataSlice(decimalValue, 3));
            expect((0, _bytes.hexDataSlice)(decimalValue, 2, 4)).toStrictEqual(_ethers.utils.hexDataSlice(decimalValue, 2, 4));
            expect((0, _bytes.hexDataSlice)(decimalValue, 100)).toStrictEqual(_ethers.utils.hexDataSlice(decimalValue, 100));
        });
    });
    it('numbers - matches ethers decimals', ()=>{
        const decimalValues = [
            [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9
            ]
        ];
        decimalValues.forEach((decimalValue)=>{
            expect((0, _bytes.hexDataSlice)(decimalValue, 1, 2)).toStrictEqual(_ethers.utils.hexDataSlice(decimalValue, 1, 2));
        });
    });
    it('should throw error - invalid hexData', ()=>{
        const values = [
            'non-hex string',
            '0x938'
        ];
        values.forEach((value)=>{
            expect(()=>(0, _bytes.hexDataSlice)(value, 1, 3)).toThrow('invalid hexData');
        });
    });
});
