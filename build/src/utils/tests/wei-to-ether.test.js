"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _bigJs = /*#__PURE__*/ _interopRequireDefault(require("big.js"));
const _ethers = /*#__PURE__*/ _interopRequireWildcard(require("ethers"));
const _web3 = /*#__PURE__*/ _interopRequireDefault(require("web3"));
const _index = require("../../index");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
describe('wei-to-ether', ()=>{
    it('happy path', ()=>{
        expect((0, _index.weiToEther)('100000000000000000000.0').toString()).toBe('100');
        expect((0, _index.weiToEther)(100000000000000000000.0).toString()).toBe('100');
        expect((0, _index.weiToEther)('1000000000000000000000.0').toNumber()).toBe(1000);
        expect((0, _index.weiToEther)(1000000000000000000000.0).toNumber()).toBe(1000);
        expect((0, _index.weiToEther)((0, _index.tinyBig)('1000000000000000000000.0')).toNumber()).toBe(1000);
        expect((0, _index.weiToEther)((0, _index.tinyBig)(1000000000000000000000.0)).toNumber()).toBe(1000);
        expect((0, _index.weiToEther)((0, _bigJs.default)('1000000000000000000000.0')).toNumber()).toBe(1000);
        expect((0, _index.weiToEther)((0, _bigJs.default)(1000000000000000000000.0)).toNumber()).toBe(1000);
    });
    describe('matches ethers and web3 toString', ()=>{
        it('toString', ()=>{
            expect((0, _index.weiToEther)('10').toString()).toStrictEqual(_ethers.utils.formatEther('10'));
            expect((0, _index.weiToEther)('1000000000000000000000').toString()).toBe('1000');
            expect((0, _index.weiToEther)('10').toString()).toStrictEqual(_web3.default.utils.fromWei('10', 'ether'));
            expect((0, _index.weiToEther)('1000000000000000000000').toString()).toStrictEqual(_web3.default.utils.fromWei('1000000000000000000000', 'ether'));
        });
        it('toNumber', ()=>{
            /* easy */ expect((0, _index.weiToEther)('9').toNumber()).toStrictEqual(Number(_ethers.utils.formatEther('9')));
            // expect(weiToEther("9").toNumber()).toStrictEqual(
            //   Number(ethers.utils.formatEther("9")),
            // );
            expect((0, _index.weiToEther)('9').toNumber()).toStrictEqual(Number(_web3.default.utils.fromWei('9', 'ether')));
            /* hard because they respond with scientific notation or overflowing */ expect((0, _index.weiToEther)('999999').toNumber()).toStrictEqual(Number(_ethers.utils.formatEther('999999')));
            expect((0, _index.weiToEther)('999999').toNumber()).toStrictEqual(Number(_web3.default.utils.fromWei('999999', 'ether')));
        });
    });
    it('support hex', ()=>{
        expect((0, _index.weiToEther)('0x14').toString()).toStrictEqual(_ethers.utils.formatEther('20'));
        expect((0, _index.weiToEther)(0x14).toString()).toStrictEqual(_ethers.utils.formatEther('20'));
    });
    it('wrong types', ()=>{
        expect(()=>{
            // @ts-expect-error should not accept boolean
            (0, _index.weiToEther)(false);
        }).toThrow();
        expect(()=>{
            // @ts-expect-error should not accept array
            (0, _index.weiToEther)([
                1,
                2,
                3
            ]);
        }).toThrow();
    });
});
