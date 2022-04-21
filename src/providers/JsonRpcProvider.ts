import { BaseProvider } from './BaseProvider';
export class JsonRpcProvider extends BaseProvider {
  selectRpcUrl(): string {
    return this._rpcUrls[0];
  }
  // private post(...args): {
  //   return this._post(args);
  // }

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
