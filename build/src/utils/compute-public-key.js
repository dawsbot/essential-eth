"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computePublicKey", {
    enumerable: true,
    get: ()=>computePublicKey
});
const _secp256K1 = require("@noble/secp256k1");
const _bytes = require("./bytes");
function computePublicKey(privKey) {
    privKey = (0, _bytes.hexlify)(privKey).slice(2);
    return '0x' + _secp256K1.Point.fromPrivateKey(privKey).toHex();
}
