"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _index = require("../../../index");
const _rpcUrls = require("../rpc-urls");
const rpcUrl = _rpcUrls.rpcUrls.mainnet;
describe('provider.getGasPrice', ()=>{
    it('should match ethers and essential-eth', async ()=>{
        const ethersProvider = new _ethers.ethers.providers.StaticJsonRpcProvider(rpcUrl);
        const essentialEthProvider = new _index.JsonRpcProvider(rpcUrl);
        const [ethersGasPrice, essentialEthGasPrice] = await Promise.all([
            ethersProvider.getGasPrice(),
            essentialEthProvider.getGasPrice()
        ]);
        expect(ethersGasPrice.sub(essentialEthGasPrice.toString()).toNumber()).toBeLessThan(100);
    });
});
