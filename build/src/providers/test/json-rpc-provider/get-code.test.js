"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _providers = require("@ethersproject/providers");
const _web3 = /*#__PURE__*/ _interopRequireDefault(require("web3"));
const _index = require("../../../index");
const _rpcUrls = require("../rpc-urls");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Using Polygon to be able to access archive blocks
// Choosing to use Ethereum mainnet means that as new blocks are generated, block numbers used in testing may be inaccessible and cause tests to fail
const rpcUrl = _rpcUrls.rpcUrls.matic;
// can't test for earliest block (at least for Ethereum) as it's very unlikely there was a smart contract on the first block
const inputs = [
    {
        address: '0x00153ab45951268d8813BCAb403152A059B99CB1',
        blockTag: undefined
    },
    {
        address: '0xF6c506F64Fa4bbF64a6b4539506abadF8C7f16b8',
        blockTag: 'latest'
    },
    {
        address: '0x97f589D427c4DFA48e3F3F50Ff0C5b49334DdE22',
        blockTag: '0xe1e51d'
    },
    {
        address: '0x3c9D4Ea65b59BEa7178c62d403d560f938221f9d',
        blockTag: 28114328
    }
];
describe('provider.getCode', ()=>{
    const essentialEthProvider = new _index.JsonRpcProvider(rpcUrl);
    const ethersProvider = new _providers.StaticJsonRpcProvider(rpcUrl);
    const web3Provider = new _web3.default(rpcUrl);
    it('should match ethers.js', async ()=>{
        await inputs.forEach(async (input)=>{
            const [essentialEthCode, ethersCode] = await Promise.all([
                essentialEthProvider.getCode(input.address, input.blockTag),
                ethersProvider.getCode(input.address, input.blockTag)
            ]);
            expect(essentialEthCode).toStrictEqual(ethersCode);
        });
    });
    it('should match web3.js', async ()=>{
        await inputs.forEach(async (input)=>{
            const [essentialEthCode, web3Code] = await Promise.all([
                essentialEthProvider.getCode(input.address, input.blockTag),
                web3Provider.eth.getCode(input.address, input.blockTag)
            ]);
            expect(essentialEthCode).toStrictEqual(web3Code);
        });
    });
    it('should return `0x` when a contract does not exist', async ()=>{
        const invalidInput = {
            address: '0xd31a02A126Bb7ACD359BD61E9a8276959408855E',
            blockTag: 28314328
        };
        const essentialEthCode = await essentialEthProvider.getCode(invalidInput.address, invalidInput.blockTag);
        expect(essentialEthCode).toBe('0x');
    });
});
