"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _contracts = require("@ethersproject/contracts");
const _providers = require("@ethersproject/providers");
const _index = require("../../../index");
const _contract = require("../../Contract");
const _rpcUrls = require("../../../providers/test/rpc-urls");
const _ensAbi = require("./ens-abi");
// The JSONABI
const JSONABI = _ensAbi.ensABI;
const rpcURL = _rpcUrls.rpcUrls.mainnet;
const ethersProvider = new _providers.StaticJsonRpcProvider(rpcURL);
const essentialEthProvider = new _index.FallthroughProvider([
    'nope',
    'https://flash-the-slow-api.herokuapp.com/delay/1',
    rpcURL
]);
const contractAddress = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
const ethersContract = new _contracts.Contract(contractAddress, JSONABI, ethersProvider);
const essentialEthContract = new _contract.Contract(contractAddress, JSONABI, essentialEthProvider);
// hash of "daws" from "daws.eth"
const labelHash = '50169637832853779738672089874069382521487784580321107885800103657377856021675';
describe('eNS Base Registrar Expiration', ()=>{
    it('should detect expiration properly', async ()=>{
        const [ethersExpiration, essentialEthExpiration] = await Promise.all([
            ethersContract.nameExpires(labelHash),
            essentialEthContract.nameExpires(labelHash)
        ]);
        expect(essentialEthExpiration.toNumber()).toBe(1853233633);
        expect(ethersExpiration.toNumber()).toBe(essentialEthExpiration.toNumber());
    });
});
