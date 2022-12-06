"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _ethers = require("ethers");
const _justOmit = /*#__PURE__*/ _interopRequireDefault(require("just-omit"));
const _web3 = /*#__PURE__*/ _interopRequireDefault(require("web3"));
const _hexToDecimal = require("../../../classes/utils/hex-to-decimal");
const _index = require("../../../index");
const _rpcUrls = require("../rpc-urls");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const rpcUrl = _rpcUrls.rpcUrls.mainnet;
describe('provider.getTransaction', ()=>{
    function testTransactionEquality(transaction1, transaction2) {
        let numCheckKeys = [];
        let omittable1 = [];
        let omittable2 = [];
        if (transaction1.confirmations) {
            // only the ethers response has confirmations
            // requires manually comparing values via bigNum conversion
            numCheckKeys = [
                'nonce',
                'value',
                'gas',
                'gasPrice',
                'maxFeePerGas',
                'maxPriorityFeePerGas',
                'confirmations'
            ];
            omittable1 = [
                'wait',
                'creates',
                'data',
                'gasLimit',
                'input',
                ...numCheckKeys
            ];
            omittable2 = [
                'input',
                ...numCheckKeys
            ];
            numCheckKeys.forEach((key)=>{
                let ethersKey = key;
                if (key === 'gas') {
                    ethersKey = 'gasLimit';
                }
                // give small room for error in tests
                expect((0, _index.tinyBig)(transaction1[ethersKey]).minus((0, _index.tinyBig)(transaction2[key])).abs().lt(2)).toBe(true);
            });
            expect(Math.abs(transaction1.confirmations - transaction2.confirmations)).toBeLessThan(3);
        } else {
            numCheckKeys = [
                'chainId',
                'gas',
                'gasPrice',
                'maxFeePerGas',
                'maxPriorityFeePerGas',
                'nonce',
                'v',
                'value'
            ];
            omittable1 = [
                ...numCheckKeys
            ];
            omittable2 = [
                'confirmations',
                ...numCheckKeys
            ];
            numCheckKeys.forEach((key)=>{
                if (typeof transaction1[key] === 'string' && transaction1[key].startsWith('0x')) {
                    transaction1[key] = Number((0, _hexToDecimal.hexToDecimal)(transaction1[key]));
                }
                // give room for error in tests
                expect((0, _index.tinyBig)(transaction1[key]).minus((0, _index.tinyBig)(transaction2[key])).abs().lt(2)).toBe(true);
            });
        }
        const omittedTransaction1 = (0, _justOmit.default)(transaction1, omittable1);
        const omittedTransaction2 = (0, _justOmit.default)(transaction2, omittable2);
        expect(omittedTransaction1).toMatchObject(omittedTransaction2);
    }
    it('should match web3.js', async ()=>{
        const transactionHash = '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
        const web3Provider = new _web3.default(rpcUrl);
        const essentialEthProvider = new _index.JsonRpcProvider(rpcUrl);
        const [web3Transaction, essentialEthTransaction] = await Promise.all([
            web3Provider.eth.getTransaction(transactionHash),
            essentialEthProvider.getTransaction(transactionHash)
        ]);
        testTransactionEquality(web3Transaction, essentialEthTransaction);
    });
    it('should match ethers.js', async ()=>{
        const transactionHash = '0x9014ae6ef92464338355a79e5150e542ff9a83e2323318b21f40d6a3e65b4789';
        const ethersProvider = new _ethers.ethers.providers.StaticJsonRpcProvider(rpcUrl);
        const essentialEthProvider = new _index.JsonRpcProvider(rpcUrl);
        const [ethersTransaction, essentialEthTransaction] = await Promise.all([
            ethersProvider.getTransaction(transactionHash),
            essentialEthProvider.getTransaction(transactionHash)
        ]);
        testTransactionEquality(ethersTransaction, essentialEthTransaction);
    });
});
