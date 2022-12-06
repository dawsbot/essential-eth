"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "weiToEther", {
    enumerable: true,
    get: ()=>weiToEther
});
const _tinyBig = require("../shared/tiny-big/tiny-big");
const _validateType = require("../shared/validate-type");
function weiToEther(weiQuantity) {
    (0, _validateType.validateType)(weiQuantity, [
        'string',
        'number',
        'object'
    ]);
    // eslint-disable-next-line no-useless-catch
    try {
        let _weiQuantity = weiQuantity;
        if (typeof weiQuantity === 'string' && weiQuantity.slice(0, 2) === '0x') {
            _weiQuantity = BigInt(weiQuantity).toString();
        }
        const result = (0, _tinyBig.tinyBig)(_weiQuantity).div('1000000000000000000');
        return (0, _tinyBig.tinyBig)(result);
    } catch (error) {
        throw error;
    }
}
