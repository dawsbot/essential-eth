"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _bigJs = /*#__PURE__*/ _interopRequireDefault(require("big.js"));
const _index = require("../../index");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('gweiToEther', ()=>{
    it('happy path', ()=>{
        expect((0, _index.gweiToEther)('100000000000.0').toString()).toBe('100');
        expect((0, _index.gweiToEther)(100000000000.0).toString()).toBe('100');
        expect((0, _index.gweiToEther)('1000000000000.0').toNumber()).toBe(1000);
        expect((0, _index.gweiToEther)(1000000000000.0).toNumber()).toBe(1000);
        expect((0, _index.gweiToEther)((0, _index.tinyBig)('1000000000000.0')).toNumber()).toBe(1000);
        expect((0, _index.gweiToEther)((0, _index.tinyBig)(1000000000000.0)).toNumber()).toBe(1000);
        expect((0, _index.gweiToEther)((0, _bigJs.default)('1000000000000.0')).toNumber()).toBe(1000);
        expect((0, _index.gweiToEther)((0, _bigJs.default)(1000000000000.0)).toNumber()).toBe(1000);
    });
    it('wrong types', ()=>{
        expect(()=>{
            // @ts-expect-error should not accept boolean
            (0, _index.gweiToEther)(false);
        }).toThrow();
        expect(()=>{
            // @ts-expect-error should not accept array
            (0, _index.gweiToEther)([
                1,
                2,
                3
            ]);
        }).toThrow();
    });
});
