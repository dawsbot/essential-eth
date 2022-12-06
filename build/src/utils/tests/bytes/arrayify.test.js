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
describe('arrayify', ()=>{
    it('matches ethers', ()=>{
        const inputs = [
            0,
            1,
            '0x1234',
            new Uint8Array(2),
            (0, _.tinyBig)(17)
        ];
        inputs.forEach((input)=>{
            //       console.log({ input, arr: arrayify(input as any) });
            expect((0, _.arrayify)(input)).toStrictEqual(_ethers.utils.arrayify(input));
        });
        expect((0, _.arrayify)('12', {
            allowMissingPrefix: true
        })).toStrictEqual(_ethers.utils.arrayify('12', {
            allowMissingPrefix: true
        }));
        expect((0, _.arrayify)('0x1', {
            hexPad: 'left'
        })).toStrictEqual(_ethers.utils.arrayify('0x1', {
            hexPad: 'left'
        }));
        expect((0, _.arrayify)('0x1', {
            hexPad: 'right'
        })).toStrictEqual(_ethers.utils.arrayify('0x1', {
            hexPad: 'right'
        }));
        // hex data is odd length
        expect(()=>(0, _.arrayify)((0, _.tinyBig)(15))).toThrow();
        // invalid arrayify value
        expect(()=>(0, _.arrayify)(false)).toThrow();
    });
});
