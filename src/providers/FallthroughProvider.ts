import { logger } from '../logger/logger';
import { BaseProvider } from './BaseProvider';

// https://advancedweb.hu/how-to-add-timeout-to-a-promise-in-javascript/
const promiseTimeout = (prom: Promise<any>, time: number) =>
  Promise.race([
    prom,
    new Promise((_r, reject) =>
      setTimeout(() => reject('Promise timed out'), time),
    ),
  ]);

/**
 * Similar to ethers FallbackProvider, but with simpler fallthrough behavior
 */
export class FallthroughProvider extends BaseProvider {
  // index of current trusted rpc url
  private rpcUrlCounter = 0;
  /**
   * Time in ms for which any request should be considered stale
   */
  private readonly TIMEOUT_DURATION = 8000;
  selectRpcUrl(): string {
    return this._rpcUrls[this.rpcUrlCounter];
  }

  post = (body: Record<string, unknown>): Promise<any> => {
    // while failing post, add to rpcUrlCounter and post again
    const genesisCount = this.rpcUrlCounter;

    const recursivePostRetry = (): Promise<any> => {
      // Times out request
      const res = promiseTimeout(this._post(body), this.TIMEOUT_DURATION).catch(
        (e) => {
          // add one and handle array overflow
          this.rpcUrlCounter = (this.rpcUrlCounter + 1) % this._rpcUrls.length;
          // we've already tried this rpc, throw for good
          if (this.rpcUrlCounter === genesisCount) {
            throw e;
          }
          return recursivePostRetry();
        },
      );
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
