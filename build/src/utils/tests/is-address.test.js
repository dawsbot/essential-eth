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
describe('is-address', ()=>{
    it('should validate real addresses', ()=>{
        const addresses = [
            '0x52908400098527886E0F7030069857D2E4169EE7',
            '0x8617E340B3D01FA5F11F306F4090FD50E238070D',
            '0xde709f2102306220921060314715629080e2fb77',
            '0x27b1fdb04752bbc536007a920d24acb045561c26',
            '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
            '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
            '0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
            '0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb',
            '27b1fdb04752bbc536007a920d24acb045561c26' /* leading "0x" is not required */ 
        ];
        addresses.forEach((address)=>{
            expect((0, _index.isAddress)(address)).toStrictEqual(_ethers.utils.isAddress(address));
            expect((0, _index.isAddress)(address)).toStrictEqual(_web3.default.utils.isAddress(address));
        });
    });
    it('should return false on invalid addresses', ()=>{
        const addresses = [
            '0x5290840009852',
            '0x8617E340b3D01FA5F11F306F4090FD50E238070D',
            '0x8617e340b3d01FA5F11F306F4090FD50E238070D' /* invalid checksum */ ,
            ' 0xde709f2102306220921060314715629080e2fb77',
            'dawsbot.eth' /* ens invalid */ ,
            '',
            'xyz',
            '0x123'
        ];
        addresses.forEach((address)=>{
            const essentialEthIsAddress = (0, _index.isAddress)(address);
            const ethersIsAddress = _ethers.utils.isAddress(address);
            const web3IsAddress = _web3.default.utils.isAddress(address);
            expect(essentialEthIsAddress).toStrictEqual(ethersIsAddress);
            expect(essentialEthIsAddress).toStrictEqual(web3IsAddress);
        });
    });
    it('invalid type inputs', ()=>{
        expect(()=>{
            // @ts-expect-error should not accept boolean
            (0, _index.isAddress)(false);
        }).toThrow('string required. Received boolean');
        expect(()=>{
            // @ts-expect-error should not accept array
            (0, _index.isAddress)([
                1,
                2,
                3
            ]);
        }).toThrow('string required. Received object');
    });
});
