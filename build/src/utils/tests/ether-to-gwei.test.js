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
        expect((0, _index.etherToGwei)('100.0').toString()).toBe('100000000000');
        expect((0, _index.etherToGwei)(100.0).toString()).toBe('100000000000');
        expect((0, _index.etherToGwei)('0.000000001').toNumber()).toBe(1);
        expect((0, _index.etherToGwei)(0.000000001).toNumber()).toBe(1);
        expect((0, _index.etherToGwei)((0, _index.tinyBig)(1000)).toNumber()).toBe(1000000000000);
        expect((0, _index.etherToGwei)((0, _bigJs.default)(0.000000001)).toNumber()).toBe(1);
    });
    it('wrong types', ()=>{
        expect(()=>{
            // @ts-expect-error should not accept boolean
            (0, _index.etherToGwei)(false);
        }).toThrow();
        expect(()=>{
            // @ts-expect-error should not accept array
            (0, _index.etherToGwei)([
                1,
                2,
                3
            ]);
        }).toThrow();
    });
});
