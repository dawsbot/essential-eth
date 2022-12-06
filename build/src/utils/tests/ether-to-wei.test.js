"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _bigJs = /*#__PURE__*/ _interopRequireDefault(require("big.js"));
const _ethers = /*#__PURE__*/ _interopRequireWildcard(require("ethers"));
const _web3 = /*#__PURE__*/ _interopRequireDefault(require("web3"));
const _index = require("../../index");
const _helpers = require("../../shared/tiny-big/helpers");
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
describe('ether-to-wei', ()=>{
    it('happy path', ()=>{
        expect((0, _index.etherToWei)('100').toString()).toBe('100000000000000000000');
        expect((0, _index.etherToWei)(100).toString()).toBe('100000000000000000000');
        expect((0, _index.etherToWei)('1000.0').toString()).toBe('1000000000000000000000');
        expect((0, _index.etherToWei)(1000).toString()).toBe('1000000000000000000000');
        expect((0, _index.etherToWei)('1000.0').toNumber()).toBe(1000000000000000000000);
        expect((0, _index.etherToWei)((0, _index.tinyBig)(1000)).toString()).toBe('1000000000000000000000');
        expect((0, _index.etherToWei)((0, _index.tinyBig)('1000.0')).toNumber()).toBe(1000000000000000000000);
        expect((0, _index.etherToWei)((0, _bigJs.default)(1000)).toString()).toBe('1000000000000000000000');
        expect((0, _index.etherToWei)((0, _bigJs.default)('1000.0')).toNumber()).toBe(1000000000000000000000);
    });
    it('matches ethers and web3 toString', ()=>{
        expect((0, _index.etherToWei)('-09999.0').toString()).toStrictEqual(_ethers.utils.parseEther('-09999.0').toString());
        expect((0, _index.etherToWei)('-09999.0').toString()).toStrictEqual(_web3.default.utils.toWei('-09999.0', 'ether'));
    });
    it('matches ethers and web3 toNumber', ()=>{
        /* easy */ expect((0, _index.etherToWei)('9').toNumber()).toStrictEqual(Number(_ethers.utils.parseEther('9')));
        // web3 responds with scientific notation
        expect((0, _index.etherToWei)('9').toNumber()).toStrictEqual(Number(_web3.default.utils.toWei('9', 'ether')));
        /* harder */ expect((0, _index.etherToWei)('-0999999.90').toNumber()).toStrictEqual(Number(_ethers.utils.parseEther('-0999999.90')));
        // web3 responds with scientific notation
        expect((0, _index.etherToWei)('-0999999.9').toNumber()).toStrictEqual(Number((0, _helpers.scientificStrToDecimalStr)(_web3.default.utils.toWei('-0999999.9', 'ether'))));
    });
    it('should throw for wrong types', ()=>{
        expect(()=>{
            // @ts-expect-error should not accept boolean
            (0, _index.etherToWei)(false);
        }).toThrow();
        expect(()=>{
            // @ts-expect-error should not accept array
            (0, _index.etherToWei)([
                1,
                2,
                3
            ]);
        }).toThrow();
    });
});
