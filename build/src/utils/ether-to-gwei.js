"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "etherToGwei", {
    enumerable: true,
    get: ()=>etherToGwei
});
const _tinyBig = require("../shared/tiny-big/tiny-big");
const _validateType = require("../shared/validate-type");
function etherToGwei(etherQuantity) {
    (0, _validateType.validateType)(etherQuantity, [
        'string',
        'number',
        'object'
    ]);
    const result = (0, _tinyBig.tinyBig)(etherQuantity).times('1000000000');
    return (0, _tinyBig.tinyBig)(result);
}
