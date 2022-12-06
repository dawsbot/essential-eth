"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _contracts = require("@ethersproject/contracts");
const _providers = require("@ethersproject/providers");
const _index = require("../../../index");
const _contract = require("../../Contract");
const _rpcUrls = require("../../../providers/test/rpc-urls");
const _feiAbi = require("./fei-abi");
// The JSONABI
const JSONABI = _feiAbi.feiABI;
const rpcURL = _rpcUrls.rpcUrls.mainnet;
const ethersProvider = new _providers.StaticJsonRpcProvider(rpcURL);
const essentialEthProvider = new _index.JsonRpcProvider(rpcURL);
// https://etherscan.io/address/0xBFfB152b9392e38CdDc275D818a3Db7FE364596b
const contractAddress = '0xBFfB152b9392e38CdDc275D818a3Db7FE364596b';
const smartContractGetFeiAmountsToRedeem = async (contract, address)=>{
    const merkleRoot = await contract.getAmountsToRedeem(address);
    return merkleRoot;
};
const ethersContract = new _contracts.Contract(contractAddress, JSONABI, ethersProvider);
const essentialEthContract = new _contract.Contract(contractAddress, JSONABI, essentialEthProvider);
describe('fEI contract', ()=>{
    it('should fetch unclaimed amounts "[uint256, uint256, uint256]" data-type', async ()=>{
        const [ethersResponse, essentialEthResponse] = await Promise.all([
            smartContractGetFeiAmountsToRedeem(ethersContract, '0xf5dBA31743ea341057280bb3AdD5c2Fb505BDC4C'),
            smartContractGetFeiAmountsToRedeem(essentialEthContract, '0xf5dBA31743ea341057280bb3AdD5c2Fb505BDC4C')
        ]);
        expect(ethersResponse[0].toString()).toBe(essentialEthResponse[0].toString());
        expect(ethersResponse[1].toString()).toBe(essentialEthResponse[1].toString());
        expect(ethersResponse[2].toString()).toBe(essentialEthResponse[2].toString());
        expect(essentialEthResponse[2].toNumber()).toBe(0);
    });
    it('should fetch "uint8" data-type', async ()=>{
        const [ethersResponse, essentialEthResponse] = await Promise.all([
            ethersContract.decimals(),
            essentialEthContract.decimals()
        ]);
        expect(ethersResponse).toStrictEqual(essentialEthResponse);
    });
    it('should throw errors for methods using unsupported data-types', async ()=>{
        await expect(essentialEthContract.name()).rejects.toThrow('essential-eth does not yet support "string" outputs. Make a PR today!');
    });
// it.only('should fetch "string" name data-type', async () => {
//   const [ethersResponse, essentialEthResponse] = await Promise.all([
//     ethersContract.symbol(),
//     essentialEthContract.symbol(),
//   ]);
//   expect(ethersResponse).toStrictEqual(essentialEthResponse);
//   const [ethers2Response, essential2EthResponse] = await Promise.all([
//     ethersContract.name(),
//     essentialEthContract.name(),
//   ]);
//   expect(ethers2Response).toStrictEqual(essential2EthResponse);
// });
});
