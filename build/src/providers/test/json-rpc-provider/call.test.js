"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _bigJs = /*#__PURE__*/ _interopRequireDefault(require("big.js"));
const _ethers = require("ethers");
const _web3 = /*#__PURE__*/ _interopRequireDefault(require("web3"));
const _ = require("../../../index");
const _hexToDecimal = require("../../../classes/utils/hex-to-decimal");
const _rpcUrls = require("../rpc-urls");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const rpcUrl = _rpcUrls.rpcUrls.mainnet;
// Based on https://etherscan.io/tx/0x277c40de5bf1d4fa06e37dce8e1370dac7273a4b2a883515176f51abaa50d512
const dataTo = {
    data: '0x70a082310000000000000000000000006E0d01A76C3Cf4288372a29124A26D4353EE51BE',
    to: '0x6b175474e89094c44da98b954eedeac495271d0f'
};
// Based on https://etherscan.io/tx/0xfc4a0544289c9eae2f94a9091208e3793ef8e9e93ea4dbaa80f70115be5e9813
const dataFromGasTo = {
    to: '0x3d13c2224a1cdd661e4cc91091f83047750270c5',
    from: '0x0000000000000000000000000000000000000000',
    nonce: '0x1',
    gas: 999999,
    data: '0x1234',
    value: '0x123',
    // not sure how to get "chainId" into proper format
    // chainId: 1,
    type: 1,
    maxFeePerGas: '0xffffffffff'
};
describe('provider.call', ()=>{
    const essentialEthProvider = new _.JsonRpcProvider(rpcUrl);
    const web3Provider = new _web3.default(rpcUrl);
    const ethersProvider = new _ethers.ethers.providers.StaticJsonRpcProvider(rpcUrl);
    it('throws', async ()=>{
        await expect(essentialEthProvider.call({
            ...dataTo,
            maxFeePerGas: '0x12',
            maxPriorityFeePerGas: '0x123'
        })).rejects.toThrow();
        await expect(essentialEthProvider.call({
            ...dataTo,
            gasPrice: '0xfffffff',
            maxFeePerGas: '0x12'
        })).rejects.toThrow();
        await expect(essentialEthProvider.call({
            ...dataTo,
            gasPrice: '0xfffffff',
            maxPriorityFeePerGas: '0x123'
        })).rejects.toThrow();
    });
    it('should match ethers.js -- data, to', async ()=>{
        const [eeCall, ethersCall, web3Call] = await Promise.all([
            essentialEthProvider.call(dataTo),
            ethersProvider.call(dataTo),
            web3Provider.eth.call(dataTo)
        ]);
        expect(eeCall).toBe(ethersCall);
        expect(eeCall).toBe(web3Call);
    });
    it('should match ethers.js -- data, to, gasPrice', async ()=>{
        const data = {
            ...dataTo,
            gasPrice: 99999999999
        };
        const [eeCall, ethersCall, web3Call] = await Promise.all([
            essentialEthProvider.call(data),
            ethersProvider.call(data),
            web3Provider.eth.call(data)
        ]);
        expect(eeCall).toBe(ethersCall);
        expect(eeCall).toBe(web3Call);
    });
    it('should match ethers.js -- all mixed data as strings', async ()=>{
        const [eeCall, ethersCall, web3Call] = await Promise.all([
            essentialEthProvider.call(dataFromGasTo),
            ethersProvider.call(dataFromGasTo),
            web3Provider.eth.call({
                ...dataFromGasTo,
                nonce: Number((0, _hexToDecimal.hexToDecimal)(dataFromGasTo.nonce))
            })
        ]);
        expect(eeCall).toBe(ethersCall);
        expect(eeCall).toBe(web3Call);
    });
    it('should match ethers.js -- all mixed data as TinyBig', async ()=>{
        const [eeCall, ethersCall, web3Call] = await Promise.all([
            essentialEthProvider.call({
                ...dataFromGasTo,
                nonce: (0, _.tinyBig)(dataFromGasTo.nonce),
                gas: (0, _.tinyBig)(dataFromGasTo.gas),
                value: (0, _.tinyBig)(dataFromGasTo.value)
            }),
            ethersProvider.call(dataFromGasTo),
            web3Provider.eth.call({
                ...dataFromGasTo,
                nonce: Number((0, _hexToDecimal.hexToDecimal)(dataFromGasTo.nonce))
            })
        ]);
        expect(eeCall).toBe(ethersCall);
        expect(eeCall).toBe(web3Call);
    });
    it('should match ethers.js -- all mixeddata as Big', async ()=>{
        const [eeCall, ethersCall, web3Call] = await Promise.all([
            essentialEthProvider.call({
                ...dataFromGasTo,
                nonce: new _bigJs.default((0, _hexToDecimal.hexToDecimal)(dataFromGasTo.nonce)),
                gas: new _bigJs.default(dataFromGasTo.gas),
                value: new _bigJs.default((0, _hexToDecimal.hexToDecimal)(dataFromGasTo.value))
            }),
            ethersProvider.call(dataFromGasTo),
            web3Provider.eth.call({
                ...dataFromGasTo,
                nonce: Number((0, _hexToDecimal.hexToDecimal)(dataFromGasTo.nonce))
            })
        ]);
        expect(eeCall).toBe(ethersCall);
        expect(eeCall).toBe(web3Call);
    });
});
