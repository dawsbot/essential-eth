import unfetch from 'isomorphic-unfetch';
export function post(url: string, body: Record<string, unknown>) {
  return unfetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((r) => r.json());
}

type RPCMethodName = 'eth_getBlockByNumber' | 'eth_call';
export function buildRPCPostBody(method: RPCMethodName, params: any[]) {
  return {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  };
}
