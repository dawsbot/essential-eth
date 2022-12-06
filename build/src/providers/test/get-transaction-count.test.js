"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _web3 = /*#__PURE__*/ _interopRequireDefault(require("web3"));
const _ = require("../../index");
const _rpcUrls = require("./rpc-urls");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// coinbase 1 hotwallet
const address = '0x71660c4005ba85c37ccec55d0c4493e66fe775d3';
/**
 *
 * @param rpcUrl
 * @param blockTag
 */ async function testGetTC(rpcUrl, blockTag) {
    const eeProvider = (0, _.jsonRpcProvider)(rpcUrl);
    const ethersProvider = new _ethers.ethers.providers.StaticJsonRpcProvider(rpcUrl);
    const web3Provider = new _web3.default(rpcUrl);
    const [eeTC, ethersTC, web3TC] = await Promise.all([
        eeProvider.getTransactionCount(address, blockTag),
        ethersProvider.getTransactionCount(address, blockTag),
        web3Provider.eth.getTransactionCount(address, blockTag)
    ]);
    if (typeof blockTag === 'number') {
        // a magic-number, no significance
        expect(eeTC).toBe(1053312);
    }
    expect(eeTC).toBe(ethersTC);
    expect(eeTC).toBe(web3TC);
}
describe('provider.getBalance mainnet', ()=>{
    const rpcUrl = _rpcUrls.rpcUrls.matic;
    it('should get latest equal to ethers and web3', async ()=>{
        await testGetTC(rpcUrl, 'latest');
    });
    it('should get default latest equal to ethers and web3', async ()=>{
        await testGetTC(rpcUrl);
    });
    it('should get earliest equal to ethers and web3', async ()=>{
        await testGetTC(rpcUrl, 'earliest');
    });
// re-enable when we have an archive node
// fast-sync nodes are cheap and cannot compute old block data like this
// Yields Error "missing trie node"
// it('should tx count up to block number equal to ethers and web3', async () => {
//   await testGetTC(rpcUrl, 14649390);
// });
});
