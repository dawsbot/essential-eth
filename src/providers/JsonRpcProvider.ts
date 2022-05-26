import { BaseProvider } from './BaseProvider';
export class JsonRpcProvider extends BaseProvider {
  /**
   * @ignore
   */
  selectRpcUrl(): string {
    return this._rpcUrls[0];
  }

  /**
   * @ignore
   */
  post(body: Record<string, unknown>): Promise<any> {
    return this._post(body);
  }

  /**
   * @param rpcUrl The URL to your Eth node. Consider POKT or Infura
   */
  constructor(rpcUrl = 'https://free-eth-node.com/api/eth') {
    super([rpcUrl]);
  }
}

/**
 * Helper function to avoid "new"
 *
 * @param rpcUrl
 * @example
 * ```javascript
 * jsonRpcProvider().getBlock('latest').then(block => {
 *   console.log(block.number);
 * })
 * // 14530496
 * ```
 */
export function jsonRpcProvider(rpcUrl?: string) {
  return new JsonRpcProvider(rpcUrl);
}
