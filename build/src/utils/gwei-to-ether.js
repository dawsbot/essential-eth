"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "gweiToEther", {
    enumerable: true,
    get: ()=>gweiToEther
});
const _tinyBig = require("../shared/tiny-big/tiny-big");
const _validateType = require("../shared/validate-type");
function gweiToEther(gweiQuantity) {
    (0, _validateType.validateType)(gweiQuantity, [
        'string',
        'number',
        'object'
    ]);
    const result = (0, _tinyBig.tinyBig)(gweiQuantity).div('1000000000');
    return (0, _tinyBig.tinyBig)(result);
}
