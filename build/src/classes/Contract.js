"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BaseContract: ()=>BaseContract,
    defineReadOnly: ()=>defineReadOnly,
    Contract: ()=>Contract
});
const _encodeDecodeTransaction = require("./utils/encode-decode-transaction");
/**
 * @param txnData
 * @example
 */ function estimateGas(txnData) {
    // https://ethereum.stackexchange.com/questions/1570/what-does-intrinsic-gas-too-low-mean/1694
    txnData.split('').reduce((previousValue, currentValue)=>{
        // 0 characters are 4 gwei, all others are 48 gwei
        const characterCost = currentValue === '0' ? 4 : 68;
        return previousValue + characterCost;
    }, 0);
}
class BaseContract {
    /**
   * @param addressOrName The ethereum address of the smart-contract
   * @param contractInterface The JSON ABI of the smart-contract (like http://api.etherscan.io/api?module=contract&action=getabi&address=0x090d4613473dee047c3f2706764f49e0821d256e&format=raw)
   * @param signerOrProvider An instantiated essential-eth provider
   * @example
   */ constructor(addressOrName, contractInterface, signerOrProvider){
        this._address = addressOrName;
        this._provider = signerOrProvider;
        contractInterface.filter((jsonABIArgument)=>jsonABIArgument.type === 'function').forEach((jsonABIArgument)=>{
            if ('name' in jsonABIArgument && typeof jsonABIArgument.name === 'string') {
                defineReadOnly(this, jsonABIArgument.name, async (..._args)=>{
                    let functionArguments = _args;
                    let options = {};
                    // remove options from encoding
                    const lastArg = _args[_args.length - 1];
                    if (!Array.isArray(lastArg) && typeof lastArg === 'object') {
                        options = lastArg;
                        functionArguments = _args.slice(0, _args.length - 1);
                    }
                    const data = (0, _encodeDecodeTransaction.encodeData)(jsonABIArgument, functionArguments);
                    const decimalGas = typeof options.gasLimit === 'number' ? options.gasLimit /* user passed in "gasLimit" directly */  : typeof jsonABIArgument?.gas === 'number' /* ABI specified "gas". */  ? estimateGas(data) : null;
                    const req = async ()=>{
                        return await this._provider.call({
                            to: this._address.toLowerCase(),
                            data,
                            // sometimes gas is defined in the ABI
                            ...decimalGas ? {
                                gas: `0x${decimalGas.toString(16)}`
                            } : {}
                        }, 'latest');
                    };
                    const nodeResponse = await req();
                    return (0, _encodeDecodeTransaction.decodeRPCResponse)(jsonABIArgument, nodeResponse);
                });
            }
        });
    }
}
function defineReadOnly(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: true,
        value: value,
        writable: false
    });
}
class Contract extends BaseContract {
}
