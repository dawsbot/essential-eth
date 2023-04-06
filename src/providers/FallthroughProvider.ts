import { logger } from '../logger/logger';
import { BaseProvider } from './BaseProvider';

// https://advancedweb.hu/how-to-add-timeout-to-a-promise-in-javascript/
const promiseTimeout = <T>(prom: Promise<T>, time: number): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error('Promise timed out')),
      time,
    );

    prom
      .then((result) => {
        clearTimeout(timeout);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });

export interface ConstructorOptions {
  timeoutDuration?: number;
}
const DEFAULT_TIMEOUT_DURATION = 8000;

/**
 * @beta
 * A JSON RPC Provider which moves to the next URL when one fails.
 */
export class FallthroughProvider extends BaseProvider {
  // index of current trusted rpc url
  /**
   * @ignore
   */
  private rpcUrlCounter = 0;
  private readonly timeoutDuration: number;
  /**
   * @ignore
   */
  public selectRpcUrl(): string {
    return this._rpcUrls[this.rpcUrlCounter];
  }

  constructor(rpcUrls: string[], options: ConstructorOptions = {}) {
    if (!Array.isArray(rpcUrls)) {
      logger.throwError('Array required', { rpcUrls });
    }
    if (rpcUrls.length <= 1) {
      logger.throwError('More than one rpcUrl is required', { rpcUrls });
    }
    super(rpcUrls);
    this.timeoutDuration = options.timeoutDuration || DEFAULT_TIMEOUT_DURATION;
  }

  /**
   * @ignore
   */
  public post = (body: Record<string, unknown>): Promise<any> => {
    // while failing post, add to rpcUrlCounter and post again
    const genesisCount = this.rpcUrlCounter;

    const recursivePostRetry = (): Promise<any> => {
      // Times out request
      const genesisRpcUrl = this.selectRpcUrl();
      const res = promiseTimeout(this._post(body), this.timeoutDuration).catch(
        (e) => {
          // A mutex: Only add if no other instance has discovered this url as failing yet
          if (genesisRpcUrl === this.selectRpcUrl()) {
            // add one and handle array overflow
            this.rpcUrlCounter =
              (this.rpcUrlCounter + 1) % this._rpcUrls.length;
          }
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
}
