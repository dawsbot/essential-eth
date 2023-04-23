import unfetch from 'isomorphic-unfetch';
/**
 * Forms the init field for http fetching
 * @param body
 * @internal
 */
export function buildFetchInit<T>(body: T) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}
/**
 * Makes a post request with the specified JSON data, normally to the a Ethereum JSON RPC API endpoint
 * @internal
 * @param url the URL to send the request to
 * @param body JSON POST body
 * @returns the JSON response from the server
 * @example
 * ```javascript
 * post('https://free-eth-node.com/api/eth', { jsonrpc: '2.0', id: 1, method: 'eth_gasPrice', params: [] });
 * // '0x66fa8dbfd'
 *
 * post('https://free-eth-node.com/api/eth', { jsonrpc: '2.0', id: 1, method: 'eth_getBalance', params: [ '0x4a986a6dCA6dbf99bC3d17F8D71aFb0d60e740f8', 'latest' ] });
 * // '0x312faeb995df61d4'
 * ```
 */
export function post(url: string, body: Record<string, unknown>) {
  return unfetch(url, buildFetchInit(body))
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
  | 'eth_getTransactionCount'
  | 'eth_getCode'
  | 'eth_blockNumber'
  | 'eth_estimateGas'
  | 'eth_getLogs';

/**
 * Prepares data to be sent using the {@link post} function. Data is prepared per the {@link https://en.wikipedia.org/wiki/JSON-RPC#Examples JSON RPC v2 spec}
 * @internal
 * @param method the RPC method to be invoked
 * @param params the parameters to be passed to the defined method
 * @returns a POST method body matching the {@link https://en.wikipedia.org/wiki/JSON-RPC#Examples JSON RPC v2 spec}
 * @example
 * ```javascript
 * buildRPCPostBody('eth_gasPrice', []);
 * // { jsonrpc: '2.0', id: 1, method: 'eth_gasPrice', params: [] }
 *
 * buildRPCPostBody('eth_getBalance', ['0x407d73d8a49eeb85d32cf465507dd71d507100c1', 'latest']);
 * // { jsonrpc: '2.0', id: 1, method: 'eth_getBalance', params: [ '0x4a986a6dCA6dbf99bC3d17F8D71aFb0d60e740f8', 'latest' ] }
 * ```
 */
export function buildRPCPostBody(method: RPCMethodName, params: unknown[]) {
  return {
    jsonrpc: '2.0',
    // TODO: Increment ID will be needed when websocket support is added
    id: 1,
    method,
    params,
  };
}
