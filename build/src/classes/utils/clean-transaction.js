"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cleanTransaction", {
    enumerable: true,
    get: ()=>cleanTransaction
});
const _ = require("../../index");
const _hexToDecimal = require("./hex-to-decimal");
function cleanTransaction(transaction) {
    const cleanedTransaction = {
        ...transaction
    };
    Object.keys(transaction).forEach((key)=>{
        // pending blocks have null instead of a difficulty
        // pending blocks have null instead of a miner address
        if (!transaction[key]) return;
        switch(key){
            case 'blockNumber':
            case 'chainId':
            case 'transactionIndex':
            case 'type':
            case 'v':
                cleanedTransaction[key] = Number((0, _hexToDecimal.hexToDecimal)(transaction[key]));
                break;
            case 'from':
            case 'to':
                if (transaction[key]) {
                    cleanedTransaction[key] = (0, _.toChecksumAddress)(transaction[key]);
                }
                break;
            case 'value':
            case 'gas':
            case 'gasPrice':
            case 'maxFeePerGas':
            case 'maxPriorityFeePerGas':
            case 'nonce':
                cleanedTransaction[key] = (0, _.tinyBig)((0, _hexToDecimal.hexToDecimal)(transaction[key]));
                break;
        }
    });
    return cleanedTransaction;
}
