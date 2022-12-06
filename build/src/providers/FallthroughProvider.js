"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FallthroughProvider", {
    enumerable: true,
    get: ()=>FallthroughProvider
});
const _logger = require("../logger/logger");
const _baseProvider = require("./BaseProvider");
// https://advancedweb.hu/how-to-add-timeout-to-a-promise-in-javascript/
const promiseTimeout = (prom, time)=>Promise.race([
        prom,
        new Promise((_r, reject)=>setTimeout(()=>reject('Promise timed out'), time))
    ]);
const DEFAULT_TIMEOUT_DURATION = 8000;
class FallthroughProvider extends _baseProvider.BaseProvider {
    /**
   * @ignore
   */ selectRpcUrl() {
        return this._rpcUrls[this.rpcUrlCounter];
    }
    constructor(rpcUrls, options = {}){
        if (!Array.isArray(rpcUrls)) {
            _logger.logger.throwError('Array required', {
                rpcUrls
            });
        }
        if (rpcUrls.length <= 1) {
            _logger.logger.throwError('More than one rpcUrl is required', {
                rpcUrls
            });
        }
        super(rpcUrls);
        // index of current trusted rpc url
        /**
   * @ignore
   */ this.rpcUrlCounter = 0;
        /**
   * @ignore
   */ this.post = (body)=>{
            // while failing post, add to rpcUrlCounter and post again
            const genesisCount = this.rpcUrlCounter;
            const recursivePostRetry = ()=>{
                // Times out request
                const genesisRpcUrl = this.selectRpcUrl();
                const res = promiseTimeout(this._post(body), this.timeoutDuration).catch((e)=>{
                    // A mutex: Only add if no other instance has discovered this url as failing yet
                    if (genesisRpcUrl === this.selectRpcUrl()) {
                        // add one and handle array overflow
                        this.rpcUrlCounter = (this.rpcUrlCounter + 1) % this._rpcUrls.length;
                    }
                    // we've already tried this rpc, throw for good
                    if (this.rpcUrlCounter === genesisCount) {
                        throw e;
                    }
                    return recursivePostRetry();
                });
                return res;
            };
            return recursivePostRetry();
        };
        this.timeoutDuration = options.timeoutDuration || DEFAULT_TIMEOUT_DURATION;
    }
}
