"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _providers = require("@ethersproject/providers");
const _web3 = /*#__PURE__*/ _interopRequireDefault(require("web3"));
const _index = require("../../../index");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// RSK has 30 second block times so tests pass more often
const rpcUrl = `https://public-node.rsk.co`;
describe('provider.getBlockNumber', ()=>{
    it('should match ethers.js', async ()=>{
        const essentialEthProvider = new _index.JsonRpcProvider(rpcUrl);
        const ethersProvider = new _providers.StaticJsonRpcProvider(rpcUrl);
        const [essentialEthBlockNumber, ethersBlockNumber] = await Promise.all([
            essentialEthProvider.getBlockNumber(),
            ethersProvider.getBlockNumber()
        ]);
        // allow one-block flexibility because of timing of requests
        expect(Math.abs(essentialEthBlockNumber - ethersBlockNumber)).toBeLessThan(2);
    });
    it('should match web3.js', async ()=>{
        const essentialEthProvider = new _index.JsonRpcProvider(rpcUrl);
        const web3Provider = new _web3.default(rpcUrl);
        const [essentialEthBlockNumber, web3BlockNumber] = await Promise.all([
            essentialEthProvider.getBlockNumber(),
            web3Provider.eth.getBlockNumber()
        ]);
        expect(essentialEthBlockNumber).toStrictEqual(web3BlockNumber);
    });
});
