"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _index = require("../../../index");
const _rpcUrls = require("../rpc-urls");
const xdaiRPCUrl = _rpcUrls.rpcUrls.gno;
const bscRPCUrl = _rpcUrls.rpcUrls.bnb;
describe('provider.getNetwork happy path', ()=>{
    async function testNetwork(rpcUrl) {
        const essentialEth = new _index.JsonRpcProvider(rpcUrl);
        const ethersProvider = new _ethers.ethers.providers.StaticJsonRpcProvider(rpcUrl);
        const [eeNetwork, ethersNetwork] = await Promise.all([
            essentialEth.getNetwork(),
            ethersProvider.getNetwork()
        ]);
        expect(eeNetwork.chainId).toBe(ethersNetwork.chainId);
        expect(eeNetwork.ensAddress).toBe(ethersNetwork.ensAddress);
        expect(eeNetwork.name).toBe(// xdai was renamed to gnosis but ethers is still out-of-date
        ethersNetwork.name === 'xdai' ? 'gno' : ethersNetwork.name);
    }
    it('xdai should match ethers', async ()=>{
        await testNetwork(xdaiRPCUrl);
    });
    it('bsc should match ethers', async ()=>{
        await testNetwork(bscRPCUrl);
    });
});
describe('provider.getNetwork error handling', ()=>{
    it('should throw on empty 200 http response', async ()=>{
        expect.assertions(1);
        const essentialEth = new _index.JsonRpcProvider(_rpcUrls.fakeUrls.notRPCButRealHttp);
        await essentialEth.getNetwork().catch((err)=>{
            expect(err instanceof Error).toBe(true);
        });
    });
});
