"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isAddress", {
    enumerable: true,
    get: ()=>isAddress
});
const _ = require("../index");
const _validateType = require("../shared/validate-type");
function isAddress(address) {
    (0, _validateType.validateType)(address, [
        'string'
    ]);
    try {
        (0, _.toChecksumAddress)(address);
        return true;
    } catch (error) {
        return false;
    }
}
