"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "etherToWei", {
    enumerable: true,
    get: ()=>etherToWei
});
const _tinyBig = require("../shared/tiny-big/tiny-big");
const _validateType = require("../shared/validate-type");
function etherToWei(etherQuantity) {
    (0, _validateType.validateType)(etherQuantity, [
        'string',
        'number',
        'object'
    ]);
    const result = (0, _tinyBig.tinyBig)(etherQuantity).times('1000000000000000000');
    return (0, _tinyBig.tinyBig)(result);
}
