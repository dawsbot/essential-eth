"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cleanLog", {
    enumerable: true,
    get: ()=>cleanLog
});
const _toChecksumAddress = require("../../utils/to-checksum-address");
const _hexToDecimal = require("./hex-to-decimal");
function cleanLog(log, receiptLog) {
    const cleanedLog = {
        ...log
    };
    Object.keys(log).forEach((key)=>{
        switch(key){
            case 'address':
                cleanedLog[key] = (0, _toChecksumAddress.toChecksumAddress)(log[key]);
                break;
            case 'blockNumber':
            case 'logIndex':
            case 'transactionIndex':
                cleanedLog[key] = Number((0, _hexToDecimal.hexToDecimal)(log[key]));
                break;
            case 'removed':
                if (receiptLog) {
                    delete cleanedLog[key];
                } else if (log[key] == null) {
                    cleanedLog[key] === false;
                }
                break;
        }
    });
    return cleanedLog;
}
