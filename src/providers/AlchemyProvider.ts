import { JsonRpcProvider } from './JsonRpcProvider';

export class AlchemyProvider extends JsonRpcProvider {
  constructor(apiKey: string, network = 'mainnet') {
    const alchemyUrl = `https://eth-${network}.alchemyapi.io/v2/${apiKey}`;
    super(alchemyUrl);
  }
}
