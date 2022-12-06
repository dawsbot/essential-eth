"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeAddress", {
    enumerable: true,
    get: ()=>computeAddress
});
const _ = require("../index");
const _bytes = require("./bytes");
const _keccak256 = require("./keccak256");
function computeAddress(key) {
    // compressed public keys start with 0x04
    // uncompressed public keys start with 0x03 or 0x02
    if (!key.startsWith('0x04') && !key.startsWith('0x03') && !key.startsWith('0x02')) {
        key = (0, _.computePublicKey)(key);
    }
    return (0, _.toChecksumAddress)((0, _bytes.hexDataSlice)((0, _keccak256.keccak256)((0, _bytes.hexDataSlice)(key, 1)), 12));
}
