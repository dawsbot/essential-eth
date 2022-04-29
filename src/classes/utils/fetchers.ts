import unfetch from 'isomorphic-unfetch';
export function post(url: string, body: Record<string, unknown>) {
  return unfetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then(async (r) => {
      const t = await r.text();
      try {
        return JSON.parse(t);
      } catch {
        throw new Error(`Invalid JSON RPC response: "${t}"`);
      }
    })
    .then((response) => {
      const result = response?.result;
      if (!result) {
        throw new Error(
          `Invalid JSON RPC response: ${JSON.stringify(response)}`,
        );
      }
      return response.result;
    });
}

type RPCMethodName =
  | 'eth_getBlockByNumber'
  | 'eth_getBlockByHash'
  | 'eth_call'
  | 'eth_chainId'
  | 'eth_gasPrice'
  | 'eth_getBalance'
  | 'eth_getTransactionByHash'
  | 'eth_getTransactionReceipt'
  | 'eth_getTransactionCount';
export function buildRPCPostBody(method: RPCMethodName, params: unknown[]) {
  return {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  };
}
