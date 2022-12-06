"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _encodeDecodeTransaction = require("../../utils/encode-decode-transaction");
const _fooAbi = require("./foo-abi");
describe('foo encode', ()=>{
    it('encodes "baz" function', ()=>{
        const jsonABIArgument = _fooAbi.fooABI.find((abi)=>abi.name === 'baz');
        const encoded = (0, _encodeDecodeTransaction.encodeData)(jsonABIArgument, [
            69,
            true
        ]);
        expect(encoded).toBe('0xcdcd77c000000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001');
    });
    it('encodes "bar" function', ()=>{
        const jsonABIArgument = _fooAbi.fooABI.find((abi)=>abi.name === 'bar');
        const encoded = (0, _encodeDecodeTransaction.encodeData)(jsonABIArgument, [
            'abc',
            'def'
        ]);
        expect(encoded).toBe('0xfce353f661626300000000000000000000000000000000000000000000000000000000006465660000000000000000000000000000000000000000000000000000000000');
    });
//   it('encodes "sam" function', () => {
//     const jsonABIArgument = fooABI.find(
//       (abi) => abi.name === 'sam',
//     ) as JSONABIArgument;
//     const encoded = encodeData(jsonABIArgument, ['dave', true, [1, 2, 3]]);
//     expect(encoded).toBe(
//       '0xa5643bf20000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000464617665000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003',
//     );
//   });
});
