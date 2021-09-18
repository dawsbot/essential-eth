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

export function buildRPCPostBody(
  method: 'eth_getBlockByNumber',
  params: any[],
) {
  return {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  };
}
