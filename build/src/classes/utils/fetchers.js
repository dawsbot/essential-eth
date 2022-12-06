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
    post: ()=>post,
    buildRPCPostBody: ()=>buildRPCPostBody
});
const _isomorphicUnfetch = /*#__PURE__*/ _interopRequireDefault(require("isomorphic-unfetch"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function post(url, body) {
    return (0, _isomorphicUnfetch.default)(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(async (r)=>{
        const t = await r.text();
        try {
            return JSON.parse(t);
        } catch  {
            throw new Error(`Invalid JSON RPC response: "${t}"`);
        }
    }).then((response)=>{
        const result = response?.result;
        if (!result) {
            throw new Error(`Invalid JSON RPC response: ${JSON.stringify(response)}`);
        }
        return response.result;
    });
}
function buildRPCPostBody(method, params) {
    return {
        jsonrpc: '2.0',
        // TODO: Increment ID will be needed when websocket support is added
        id: 1,
        method,
        params
    };
}
