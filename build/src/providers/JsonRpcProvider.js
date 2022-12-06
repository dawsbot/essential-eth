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
    JsonRpcProvider: ()=>JsonRpcProvider,
    jsonRpcProvider: ()=>jsonRpcProvider
});
const _baseProvider = require("./BaseProvider");
class JsonRpcProvider extends _baseProvider.BaseProvider {
    /**
   * @ignore
   */ selectRpcUrl() {
        return this._rpcUrls[0];
    }
    /**
   * @ignore
   */ post(body) {
        return this._post(body);
    }
    /**
   * @param rpcUrl The URL to your Eth node. Consider POKT or Infura
   * @example
   * `https://free-eth-node.com/api/eth`
   * @example
   * `https://mainnet.infura.io/v3/YOUR-PROJECT-ID`
   */ constructor(rpcUrl = 'https://free-eth-node.com/api/eth'){
        super([
            rpcUrl
        ]);
    }
}
function jsonRpcProvider(rpcUrl) {
    return new JsonRpcProvider(rpcUrl);
}
