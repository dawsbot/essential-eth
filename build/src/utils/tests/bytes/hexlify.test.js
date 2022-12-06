"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _bytes = require("../../bytes");
describe('utils.hexlify', ()=>{
    it('numbers - matches ethers strings', ()=>{
        const decimalValues = [
            0,
            4,
            5,
            16,
            BigInt(0),
            BigInt(16)
        ];
        decimalValues.forEach((decimalValue)=>{
            expect((0, _bytes.hexlify)(decimalValue)).toBe(_ethers.utils.hexlify(decimalValue));
        });
        const opts = {
            allowMissingPrefix: true
        };
        expect((0, _bytes.hexlify)('22', opts)).toBe(_ethers.utils.hexlify('22', opts));
    });
    it('should match ethers.js - hexPad options', ()=>{
        const values = [
            [
                '0x3342e95',
                {
                    hexPad: 'left'
                }
            ],
            [
                '0x41c942c42',
                {
                    hexPad: 'right'
                }
            ]
        ];
        values.forEach((value)=>{
            expect((0, _bytes.hexlify)(value[0], value[1])).toBe(_ethers.utils.hexlify(value[0], value[1]));
        });
    });
    it('should throw error - hex data is odd-length', ()=>{
        const values = [
            '0x931',
            '0x34414'
        ];
        values.forEach((value)=>{
            expect(()=>(0, _bytes.hexlify)(value)).toThrow('hex data is odd-length');
        });
    });
    it('should throw error - invalid hexlify value', ()=>{
        const values = [
            'non-hex string',
            false
        ];
        values.forEach((value)=>{
            expect(()=>(0, _bytes.hexlify)(value)).toThrow('invalid hexlify value');
        });
    });
});
