"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _web3 = /*#__PURE__*/ _interopRequireDefault(require("web3"));
const _index = require("../../index");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('ether-to-wei', ()=>{
    it('happy path', ()=>{
        const addresses = [
            '0x52908400098527886E0F7030069857D2E4169EE7',
            '0x8617E340B3D01FA5F11F306F4090FD50E238070D',
            '0xde709f2102306220921060314715629080e2fb77',
            '0x27b1fdb04752bbc536007a920d24acb045561c26',
            '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
            '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
            '0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
            '0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb'
        ];
        addresses.forEach((address)=>{
            expect((0, _index.toChecksumAddress)(address)).toStrictEqual(_ethers.utils.getAddress(address));
            expect((0, _index.toChecksumAddress)(address)).toStrictEqual(_web3.default.utils.toChecksumAddress(address));
        });
    });
    it('invalid inputs', ()=>{
        const invalidChecksumAddress = '0x8617E340b3D01FA5F11F306F4090FD50E238070D';
        expect(()=>{
            (0, _index.toChecksumAddress)(invalidChecksumAddress);
        }).toThrow(`Invalid Checksum address for "${invalidChecksumAddress}"`);
        expect(()=>{
            // @ts-expect-error should not accept boolean
            (0, _index.toChecksumAddress)(false);
        }).toThrow('string required. Received boolean');
        expect(()=>{
            // @ts-expect-error should not accept array
            (0, _index.toChecksumAddress)([
                1,
                2,
                3
            ]);
        }).toThrow('string required. Received object');
        expect(()=>{
            (0, _index.toChecksumAddress)('0x1');
        }).toThrow('Invalid Ethereum address "0x1"');
    });
});
