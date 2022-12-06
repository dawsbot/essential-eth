"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = /*#__PURE__*/ _interopRequireWildcard(require("ethers"));
const _ = require("../../../index");
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
describe('hexZeroPad', ()=>{
    it('numbers - matches ethers', ()=>{
        const decimalValues = [
            123,
            0
        ];
        decimalValues.forEach((decimalValue)=>{
            expect((0, _.hexZeroPad)(decimalValue, 30)).toStrictEqual(_ethers.utils.hexZeroPad(decimalValue, 30));
        });
    });
    it('arrays of numbers - matches ethers', ()=>{
        const decimalValues = [
            [
                1,
                2,
                3,
                4
            ]
        ];
        decimalValues.forEach((decimalValue)=>{
            expect((0, _.hexZeroPad)(decimalValue, 30)).toStrictEqual(_ethers.utils.hexZeroPad(decimalValue, 30));
        });
    });
    it('should reject strings passed in which are not hex strings', ()=>{
        const value = '52908';
        expect(()=>{
            (0, _.hexZeroPad)(value, 23);
        }).toThrow();
    });
    it('should throw error when value is already longer than desired length', ()=>{
        const hexValues = [
            0x123456,
            '0x5aAebAd',
            '0xfB691',
            '0xD1220ab'
        ];
        hexValues.forEach((hexValue)=>{
            expect(()=>(0, _.hexZeroPad)(hexValue, 2)).toThrow();
        });
    });
    it('should match ethers.js when padding can be applied', ()=>{
        const values = [
            10,
            '0x5290',
            '0x8617E3',
            '0xde709f210',
            '0x27b',
            0x0,
            0x5aaeb605,
            '0xfB6916095ca1df',
            '0xdbF03B407c01E7cD3CBea99509d93',
            0xd1220a0cf4
        ];
        values.forEach((value)=>{
            expect((0, _.hexZeroPad)(value, 30)).toStrictEqual(_ethers.utils.hexZeroPad(value, 30));
        });
    });
});
