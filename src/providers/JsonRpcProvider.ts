import { buildRPCPostBody } from '../classes/utils/fetchers';
import { hexToDecimal } from '../classes/utils/hex-to-decimal';
import { TinyBig, tinyBig } from '../shared/tiny-big/tiny-big';
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

  async estimateGas(transaction: Record<string, unknown>): Promise<TinyBig> {
    const params = [transaction];
    const body = buildRPCPostBody('eth_estimateGas', params);
    const gasUsed = (await this.post(body)) as string;
    return tinyBig(hexToDecimal(gasUsed));
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
