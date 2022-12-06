"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _web3 = /*#__PURE__*/ _interopRequireDefault(require("web3"));
const _ = require("../../../index");
const _rpcUrls = require("../rpc-urls");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const address = '0x0000000000000000000000000000000000000001';
async function testGetBalance(rpcUrl, blockTag) {
    const eeProvider = new _.JsonRpcProvider(rpcUrl);
    const ethersProvider = new _ethers.ethers.providers.StaticJsonRpcProvider(rpcUrl);
    const web3Provider = new _web3.default(rpcUrl);
    const [eeBalance, ethersBalance, web3Balance] = await Promise.all([
        eeProvider.getBalance(address, blockTag),
        ethersProvider.getBalance(address, blockTag),
        web3Provider.eth.getBalance(address, blockTag)
    ]);
    expect(eeBalance.toString()).toBe(ethersBalance.toString());
    expect(eeBalance.toString()).toBe(web3Balance);
}
describe('provider.getBalance matic', ()=>{
    const rpcUrl = _rpcUrls.rpcUrls.matic;
    it('should get latest equal to ethers', async ()=>{
        await Promise.all([
            testGetBalance(rpcUrl, 'latest'),
            testGetBalance(rpcUrl, 'latest')
        ]);
    });
    it('should get earliest equal to ethers', async ()=>{
        await testGetBalance(rpcUrl, 'earliest');
    });
    it('should get default latest equal to ethers', async ()=>{
        await testGetBalance(rpcUrl);
    });
});
