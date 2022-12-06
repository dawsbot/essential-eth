"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "prepareTransaction", {
    enumerable: true,
    get: ()=>prepareTransaction
});
const _bigJs = /*#__PURE__*/ _interopRequireDefault(require("big.js"));
const _tinyBig = require("../../shared/tiny-big/tiny-big");
const _bytes = require("../../utils/bytes");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function prepareTransaction(transaction) {
    const preparedTransaction = {
        ...transaction
    };
    Object.keys(transaction).forEach((key)=>{
        switch(key){
            case 'gas':
            case 'gasPrice':
            case 'nonce':
            case 'maxFeePerGas':
            case 'maxPriorityFeePerGas':
            case 'value':
                {
                    const value = transaction[key];
                    if (value instanceof _tinyBig.TinyBig) {
                        preparedTransaction[key] = value.toHexString();
                    } else if (value instanceof _bigJs.default) {
                        preparedTransaction[key] = `0x${BigInt(value.toString()).toString(16)}`;
                    } else if (typeof transaction[key] === 'number') preparedTransaction[key] = '0x' + transaction[key].toString(16);
                    else preparedTransaction[key] = transaction[key].toString();
                    break;
                }
            case 'data':
                preparedTransaction[key] = (0, _bytes.hexlify)(transaction[key]);
                break;
        }
    });
    return preparedTransaction;
}
