"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "toChecksumAddress", {
    enumerable: true,
    get: ()=>toChecksumAddress
});
const _sha3 = require("sha3");
const _validateType = require("../shared/validate-type");
function toChecksumAddress(address) {
    (0, _validateType.validateType)(address, [
        'string'
    ]);
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        throw new Error(`Invalid Ethereum address "${address}"`);
    }
    const _address = address.toLowerCase().replace(/^0x/i, '');
    const keccak = new _sha3.Keccak(256);
    const addressHash = keccak.update(_address).digest('hex').replace(/^0x/i, '');
    let checksumAddress = '0x';
    for(let i = 0; i < _address.length; i++){
        // If ith character is 8 to f then make it uppercase
        if (parseInt(addressHash[i], 16) > 7) {
            checksumAddress += _address[i].toUpperCase();
        } else {
            checksumAddress += _address[i];
        }
    }
    if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && checksumAddress !== address) {
        throw new Error(`Invalid Checksum address for "${address}"`);
    }
    return checksumAddress;
}
