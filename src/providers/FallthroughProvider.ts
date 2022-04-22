import { logger } from '../logger/logger';
import { BaseProvider } from './BaseProvider';
/**
 * Similar to ethers FallbackProvider, but with simpler fallthrough behavior
 */
export class FallthroughProvider extends BaseProvider {
  // index of current trusted rpc url
  private rpcUrlCounter = 0;
  selectRpcUrl(): string {
    return this._rpcUrls[this.rpcUrlCounter];
  }

  post = (body: Record<string, unknown>): Promise<any> => {
    // while failing post, add to rpcUrlCounter and post again
    const genesisCount = this.rpcUrlCounter;

    const recursivePostRetry = (): Promise<any> => {
      // TODO: cancel slow-responses
      const res = this._post(body).catch((e) => {
        // add one and handle array overflow
        this.rpcUrlCounter = (this.rpcUrlCounter + 1) % this._rpcUrls.length;
        // we've already tried this rpc, throw for good
        if (this.rpcUrlCounter === genesisCount) {
          throw e;
        }
        return recursivePostRetry();
      });
      return res;
    };
    return recursivePostRetry();
  };

  constructor(rpcUrls: string[]) {
    if (!Array.isArray(rpcUrls)) {
      logger.throwError('Array required', { rpcUrls });
    }
    if (rpcUrls.length <= 1) {
      logger.throwError('More than one rpcUrl is required', { rpcUrls });
    }
    super(rpcUrls);
  }
}
