// import { logger } from '../logger/logger';
import { BaseProvider } from './BaseProvider';
/**
 * Similar to ethers FallbackProvider, but with simpler fallthrough behavior
 */
export class FallthroughProvider extends BaseProvider {
  selectRpcUrl(): string {
    return this._rpcUrls[0];
  }

  constructor(rpcUrls: string[] = ['https://free-eth-node.com/api/eth']) {
    // if (rpcUrls.length <= 1) {
    //   logger.throwError('More than one rpcUrl is required', { rpcUrls });
    // }
    // if (!Array.isArray(rpcUrls)) {
    //   logger.throwError('Array required', { rpcUrls });
    // }
    super(rpcUrls);
  }
}
