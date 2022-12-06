"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cleanBlock", {
    enumerable: true,
    get: ()=>cleanBlock
});
const _ = require("../../index");
const _tinyBig = require("../../shared/tiny-big/tiny-big");
const _cleanTransaction = require("./clean-transaction");
const _hexToDecimal = require("./hex-to-decimal");
function cleanBlock(block, returnTransactionObjects) {
    const cleanedBlock = {
        ...block
    };
    Object.keys(block).forEach((key)=>{
        // pending blocks have null instead of a difficulty
        // pending blocks have null instead of a miner address
        if (!block[key]) return;
        switch(key){
            case 'difficulty':
            case 'totalDifficulty':
            case 'gasLimit':
            case 'gasUsed':
            case 'size':
            case 'timestamp':
            case 'baseFeePerGas':
                cleanedBlock[key] = (0, _tinyBig.tinyBig)((0, _hexToDecimal.hexToDecimal)(block[key]));
                break;
            case 'number':
                cleanedBlock[key] = Number((0, _hexToDecimal.hexToDecimal)(block[key]));
                break;
            case 'miner':
                cleanedBlock[key] = (0, _.toChecksumAddress)(block[key]);
                break;
        }
    });
    // for all full transactions
    if (returnTransactionObjects) {
        const txns = block.transactions;
        txns.forEach((transaction, index)=>{
            cleanedBlock.transactions[index] = (0, _cleanTransaction.cleanTransaction)(transaction);
        });
    }
    return cleanedBlock;
}
