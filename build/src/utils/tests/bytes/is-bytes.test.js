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
describe('isBytesLike', ()=>{
    it('matches ethers', ()=>{
        const inputs = [
            [
                '1',
                '2',
                '3'
            ],
            [
                1,
                2,
                3
            ],
            '0x123',
            123,
            0x123,
            'bad',
            false,
            {
                test: 'bad'
            },
            null,
            new Uint8Array(),
            new Uint8Array(1)
        ];
        inputs.forEach((input)=>{
            expect((0, _.isBytesLike)(input)).toBe(_ethers.utils.isBytesLike(input));
            expect((0, _.isBytes)(input)).toBe(_ethers.utils.isBytes(input));
        });
    });
});
