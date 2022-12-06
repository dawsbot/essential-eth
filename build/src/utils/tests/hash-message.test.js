"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _index = require("../../index");
describe('utils.hashMessage', ()=>{
    it('should match ethers.js', ()=>{
        const messages = [
            '0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb',
            '27b1fdb04752bbc536007a920d24acb045561c26' /* leading "0x" is not required */ ,
            [
                1,
                2
            ],
            [
                0x1,
                0x2
            ]
        ];
        messages.forEach((message)=>{
            expect((0, _index.hashMessage)(message)).toStrictEqual(_ethers.utils.hashMessage(message));
        });
    });
});
