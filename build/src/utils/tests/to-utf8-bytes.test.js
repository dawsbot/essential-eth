"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _index = require("../../index");
describe('utils.toUtf8Bytes', ()=>{
    it('should match ethers.js', ()=>{
        const inputs = [
            '0xa',
            '1',
            'false'
        ];
        inputs.forEach((input)=>{
            expect((0, _index.toUtf8Bytes)(input)).toStrictEqual(_ethers.utils.toUtf8Bytes(input));
        });
    });
});
