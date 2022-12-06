"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _helpers = require("./helpers");
describe('scientificStrToDecimalStr', ()=>{
    it('not even scientific', ()=>{
        expect((0, _helpers.scientificStrToDecimalStr)('010')).toBe('10');
        expect((0, _helpers.scientificStrToDecimalStr)('-010')).toBe('-10');
    });
    it('zero power', ()=>{
        expect((0, _helpers.scientificStrToDecimalStr)('10e0')).toBe('10');
        expect((0, _helpers.scientificStrToDecimalStr)('1.0e0')).toBe('1');
        expect((0, _helpers.scientificStrToDecimalStr)('-10e-0')).toBe('-10');
        expect((0, _helpers.scientificStrToDecimalStr)('-1.0e-0')).toBe('-1');
        expect((0, _helpers.scientificStrToDecimalStr)('-1.10e-0')).toBe('-1.1');
        expect((0, _helpers.scientificStrToDecimalStr)('-1.e-0')).toBe('-1');
        expect((0, _helpers.scientificStrToDecimalStr)('.10e-0')).toBe('0.1');
        expect((0, _helpers.scientificStrToDecimalStr)('00.0010e-0')).toBe('0.001');
    });
    it('negative power', ()=>{
        expect((0, _helpers.scientificStrToDecimalStr)('0100e-2')).toBe('1');
        expect((0, _helpers.scientificStrToDecimalStr)('0100e-4')).toBe('0.01');
        expect((0, _helpers.scientificStrToDecimalStr)('010.1e-3')).toBe('0.0101');
        expect((0, _helpers.scientificStrToDecimalStr)('-010.1e-3')).toBe('-0.0101');
        expect((0, _helpers.scientificStrToDecimalStr)('09.1e-51')).toBe(`0.${'0'.repeat(50)}91`);
    });
    it('positive power', ()=>{
        expect((0, _helpers.scientificStrToDecimalStr)('01e2')).toBe('100');
        expect((0, _helpers.scientificStrToDecimalStr)('-01e2')).toBe('-100');
        expect((0, _helpers.scientificStrToDecimalStr)('09.1e51')).toBe(`91${'0'.repeat(50)}`);
    });
});
