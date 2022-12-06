"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _splitSignature = require("../split-signature");
describe('splitSignature', ()=>{
    it('should match ethers.js', ()=>{
        const signatures = [
            '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee331b',
            '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33'
        ];
        signatures.forEach((signature)=>{
            expect((0, _splitSignature.splitSignature)(signature)).toStrictEqual(_ethers.utils.splitSignature(signature));
        });
    });
    it('should throw error on invalid signature', ()=>{
        const signature = '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33238423849234765127'; //invalid signature length
        expect(()=>{
            (0, _splitSignature.splitSignature)(signature);
        }).toThrow('invalid signature string');
    });
    it('should throw error on invalid v byte', ()=>{
        const signature = '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee3305';
        expect(()=>{
            (0, _splitSignature.splitSignature)(signature);
        }).toThrow('signature invalid v byte');
    });
});
