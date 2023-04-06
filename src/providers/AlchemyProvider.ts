import { BaseProvider } from './BaseProvider';

export class AlchemyProvider extends BaseProvider {
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
   * @param apiKey The Alchemy API key
   * @param network The Ethereum network to connect to
   */
  constructor(apiKey: string, network = 'mainnet') {
    const alchemyUrl = `https://eth-${network}.alchemyapi.io/v2/${apiKey}`;
    super([alchemyUrl]);
  }
}

/**
 * Helper function to avoid "new"
 *
 * @param apiKey the Alchemy API key
 * @param network the Ethereum network to connect to
 * @returns an initiated {@link AlchemyProvider}
 */
export function alchemyProvider(apiKey: string, network?: string) {
  return new AlchemyProvider(apiKey, network);
}
