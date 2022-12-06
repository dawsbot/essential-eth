"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cleanTransactionReceipt", {
    enumerable: true,
    get: ()=>cleanTransactionReceipt
});
const _ = require("../../index");
const _cleanLog = require("./clean-log");
const _cleanTransaction = require("./clean-transaction");
const _hexToDecimal = require("./hex-to-decimal");
function cleanTransactionReceipt(transactionReceipt) {
    const cleanedTransaction = (0, _cleanTransaction.cleanTransaction)(transactionReceipt);
    const cleanedTransactionReceipt = {
        ...cleanedTransaction
    };
    Object.keys(transactionReceipt).forEach((key)=>{
        if (!transactionReceipt[key]) return;
        switch(key){
            case 'status':
                cleanedTransactionReceipt[key] = Number((0, _hexToDecimal.hexToDecimal)(transactionReceipt[key]));
                break;
            case 'contractAddress':
                if (transactionReceipt[key]) {
                    cleanedTransactionReceipt[key] = (0, _.toChecksumAddress)(transactionReceipt[key]);
                }
                break;
            case 'cumulativeGasUsed':
            case 'effectiveGasPrice':
            case 'gasUsed':
                cleanedTransactionReceipt[key] = (0, _.tinyBig)((0, _hexToDecimal.hexToDecimal)(transactionReceipt[key]));
                break;
            case 'logs':
                transactionReceipt[key].forEach((log, index)=>{
                    cleanedTransactionReceipt[key][index] = (0, _cleanLog.cleanLog)(log, true);
                });
        }
    });
    cleanedTransactionReceipt.byzantium = cleanedTransactionReceipt.blockNumber >= 4370000;
    return cleanedTransactionReceipt;
}
