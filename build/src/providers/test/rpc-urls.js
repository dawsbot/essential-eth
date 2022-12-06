"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    fakeUrls: ()=>fakeUrls,
    rpcUrls: ()=>rpcUrls
});
const fakeUrls = {
    notRPCButRealHttp: 'https://httpstat.us/200'
};
const rpcUrls = {
    mainnet: `${process.env.RPC_ORIGIN}/api/eth`,
    matic: `${process.env.RPC_ORIGIN}/api/MATIC`,
    gno: `${process.env.RPC_ORIGIN}/api/gno`,
    bnb: `${process.env.RPC_ORIGIN}/api/bnb`,
    arb1: `${process.env.RPC_ORIGIN}/api/arb1`,
    gor: `${process.env.RPC_ORIGIN}/api/gor`
};
