// import { logger } from '../logger/logger';
import { logger } from '../logger/logger';
import { BaseProvider } from './BaseProvider';
/**
 * Similar to ethers FallbackProvider, but with simpler fallthrough behavior
 */
export class FallthroughProvider extends BaseProvider {
  selectRpcUrl(): string {
    return this._rpcUrls[0];
  }
  post(body: Record<string, unknown>): Promise<any> {
    return this._post(body);
  }

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
