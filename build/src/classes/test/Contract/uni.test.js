"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _contracts = require("@ethersproject/contracts");
const _providers = require("@ethersproject/providers");
const _index = require("../../../index");
const _contract = require("../../Contract");
const _rpcUrls = require("../../../providers/test/rpc-urls");
const _uniswapAbi = require("./uniswap-abi");
// The JSONABI
const JSONABI = _uniswapAbi.uniswapABI;
const rpcURL = _rpcUrls.rpcUrls.mainnet;
const ethersProvider = new _providers.StaticJsonRpcProvider(rpcURL);
const essentialEthProvider = new _index.JsonRpcProvider(rpcURL);
// The UNI airdrop merkle address
// https://etherscan.io/address/0x090D4613473dEE047c3f2706764f49E0821D256e#readContract
const contractAddress = '0x090D4613473dEE047c3f2706764f49E0821D256e';
const smartContractIsUniClaimed = async (contract, index)=>{
    const isClaimed = await contract.isClaimed(index);
    return isClaimed;
};
const smartContractGetUniMerkleRoot = async (contract)=>{
    const merkleRoot = await contract.merkleRoot();
    return merkleRoot;
};
const smartContractGetUniTokenAddress = async (contract)=>{
    const merkleRoot = await contract.token();
    return merkleRoot;
};
const ethersContract = new _contracts.Contract(contractAddress, JSONABI, ethersProvider);
const essentialEthContract = new _contract.Contract(contractAddress, JSONABI, essentialEthProvider);
describe('uNI contract', ()=>{
    it('should fetch "address" data-type', async ()=>{
        const [ethersResponse, essentialEthResponse] = await Promise.all([
            smartContractGetUniTokenAddress(ethersContract),
            smartContractGetUniTokenAddress(essentialEthContract)
        ]);
        /* 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 */ expect(ethersResponse).toStrictEqual(essentialEthResponse);
    });
    it('should fetch "bytes32" merkle root', async ()=>{
        const [ethersResponse, essentialEthResponse] = await Promise.all([
            smartContractGetUniMerkleRoot(ethersContract),
            smartContractGetUniMerkleRoot(essentialEthContract)
        ]);
        /* 0xc8500f8e2fcf3c9a32880e1b973fb28acc88be35787a8abcf9981b2b65dbdeb5 */ expect(ethersResponse).toStrictEqual(essentialEthResponse);
    });
    it('should fetch isClaimed "boolean" for random airdrop indexes', async ()=>{
        /* indexes of addresses in the merkle tree */ const randomIndexes = [
            0,
            4,
            102,
            999,
            999999
        ];
        for (const i of randomIndexes){
            const [ethersClaimed, essentialEthClaimed] = await Promise.all([
                smartContractIsUniClaimed(ethersContract, i),
                smartContractIsUniClaimed(essentialEthContract, i)
            ]);
            expect(ethersClaimed).toStrictEqual(essentialEthClaimed);
        }
    });
});
