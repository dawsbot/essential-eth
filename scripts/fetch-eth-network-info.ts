import fs from 'fs';
import unfetch from 'isomorphic-unfetch';
import path from 'path';

const outputFilePath = path.join(
  __dirname,
  '..',
  'src',
  'providers',
  'utils',
  'network-info.json',
);
(async () => {
  const toReturn: any = {};
  await unfetch('https://chainid.network/chains.json')
    .then((res) => res.json())
    .then((data: ChainsData) => {
      data.forEach((networkInfo) => {
        const writeableInfo = [networkInfo.shortName];

        const registry = networkInfo?.ens?.registry;
        if (registry) {
          writeableInfo.push(registry);
        }
        toReturn[networkInfo.chainId] = writeableInfo;
      });
    });
  fs.writeFileSync(outputFilePath, JSON.stringify(toReturn, null, 2));
})();

type ChainsData = {
  name: 'Ethereum Mainnet';
  chain: 'ETH';
  network: string; // 'mainnet';
  icon: 'ethereum';
  rpc: [
    'https://mainnet.infura.io/v3/${INFURA_API_KEY}',
    'wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}',
    'https://api.mycryptoapi.com/eth',
    'https://cloudflare-eth.com',
  ];
  faucets: [];
  nativeCurrency: {
    name: 'Ether';
    symbol: 'ETH';
    decimals: 18;
  };
  infoURL: 'https://ethereum.org';
  shortName: string; //'eth';
  chainId: 1;
  networkId: 1;
  slip44: 60;
  ens: {
    registry: string; //'0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
  };
  explorers: [
    {
      name: 'etherscan';
      url: 'https://etherscan.io';
      standard: 'EIP3091';
    },
  ];
}[];
