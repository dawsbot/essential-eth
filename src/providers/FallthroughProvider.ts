import { BaseProvider } from './BaseProvider';
/**
 * Similar to ethers FallbackProvider, but with simpler fallthrough behavior
 */
export class FallthroughProvider extends BaseProvider {
  selectRpcUrl(): string {
    return this._rpcUrls[0];
  }

  /**
   * @param rpcUrl The URL to your Eth node. Consider POKT or Infura
   */
  constructor(rpcUrls: string[] = ['https://free-eth-node.com/api/eth']) {
    super(rpcUrls);
  }
}
