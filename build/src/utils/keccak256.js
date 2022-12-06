"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "keccak256", {
    enumerable: true,
    get: ()=>keccak256
});
const _sha3 = require("sha3");
function keccak256(data) {
    let bufferableData;
    if (typeof data === 'string') {
        bufferableData = Buffer.from(data.replace(/^0x/, ''), 'hex');
    } else {
        bufferableData = Buffer.from(data);
    }
    const keccak = new _sha3.Keccak(256);
    const addressHash = '0x' + keccak.update(bufferableData).digest('hex');
    return addressHash;
}
