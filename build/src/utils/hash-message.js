"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "hashMessage", {
    enumerable: true,
    get: ()=>hashMessage
});
const _index = require("../index");
const messagePrefix = '\x19Ethereum Signed Message:\n';
function hashMessage(message) {
    if (typeof message === 'string') {
        message = (0, _index.toUtf8Bytes)(message);
    }
    return (0, _index.keccak256)((0, _index.concat)([
        (0, _index.toUtf8Bytes)(messagePrefix),
        (0, _index.toUtf8Bytes)(String(message.length)),
        message
    ]));
}
