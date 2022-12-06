"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _justOmit = /*#__PURE__*/ _interopRequireDefault(require("just-omit"));
const _web3 = /*#__PURE__*/ _interopRequireDefault(require("web3"));
const _index = require("../../../index");
const _rpcUrls = require("../rpc-urls");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const rpcUrl = _rpcUrls.rpcUrls.mainnet;
describe('provider.getTransactionReceipt', ()=>{
    function testTransactionReceiptEquality(transactionReceipt1, transactionReceipt2) {
        let typeCheckKeys = [];
        let omittable1 = [];
        let omittable2 = [];
        if (transactionReceipt1.confirmations) {
            // only ethers response has confirmations
            // requires manually comparing values via bigNum conversion
            typeCheckKeys = [
                'gasUsed',
                'cumulativeGasUsed',
                'effectiveGasPrice'
            ];
            omittable1 = typeCheckKeys;
            omittable2 = typeCheckKeys;
            typeCheckKeys.forEach((key)=>{
                expect(transactionReceipt1[key].toString()).toBe(transactionReceipt2[key].toString());
            });
            expect(Math.abs(transactionReceipt1.confirmations - transactionReceipt2.confirmations)).toBeLessThan(3);
        } else {
            typeCheckKeys = [
                'cumulativeGasUsed',
                'effectiveGasPrice',
                'from',
                'gasUsed',
                'status',
                'to',
                'type'
            ];
            omittable1 = typeCheckKeys;
            omittable2 = [
                'byzantium',
                'confirmations',
                ...typeCheckKeys
            ];
            typeCheckKeys.forEach((key)=>{
                switch(key){
                    case 'cumulativeGasUsed':
                    case 'effectiveGasPrice':
                    case 'gasUsed':
                        expect(transactionReceipt1[key].toString()).toBe(transactionReceipt2[key].toString());
                        break;
                    case 'from':
                    case 'to':
                        expect(transactionReceipt1[key]).toBe(transactionReceipt2[key].toLowerCase());
                        break;
                }
            });
        }
        const omittedTransactionReceipt1 = (0, _justOmit.default)(transactionReceipt1, omittable1);
        const omittedTransactionReceipt2 = (0, _justOmit.default)(transactionReceipt2, omittable2);
        omittedTransactionReceipt1.logs = omittedTransactionReceipt1.logs.map((log)=>(0, _justOmit.default)(log, [
                'id',
                'removed'
            ]));
        expect(omittedTransactionReceipt1).toMatchObject(omittedTransactionReceipt2);
    }
    it('should match web3.js', async ()=>{
        const transactionHash = '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
        const web3Provider = new _web3.default(rpcUrl);
        const essentialEthProvider = new _index.JsonRpcProvider(rpcUrl);
        const [web3TransactionReceipt, essentialEthTransactionReceipt] = await Promise.all([
            web3Provider.eth.getTransactionReceipt(transactionHash),
            essentialEthProvider.getTransactionReceipt(transactionHash)
        ]);
        testTransactionReceiptEquality(web3TransactionReceipt, essentialEthTransactionReceipt);
    });
    it('should match ethers', async ()=>{
        const transactionHash = '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
        const ethersProvider = new _ethers.ethers.providers.StaticJsonRpcProvider(rpcUrl);
        const essentialEthProvider = new _index.JsonRpcProvider(rpcUrl);
        const [ethersTransactionReceipt, essentialEthTransactionReceipt] = await Promise.all([
            ethersProvider.getTransactionReceipt(transactionHash),
            essentialEthProvider.getTransactionReceipt(transactionHash)
        ]);
        testTransactionReceiptEquality(ethersTransactionReceipt, essentialEthTransactionReceipt);
    });
});
