import z from 'zod';
export const fakeUrls = {
  notRPCButRealHttp: 'https://httpstat.us/200',
} as const;

const RPC_ORIGIN = 'https://free-eth-node.com';
z.string({
  required_error: '"RPC_ORIGIN" required but not found',
})
  .url('Expected url for "RPC_ORIGIN"')
  .parse(RPC_ORIGIN);

export const rpcUrls = {
  mainnet: `${RPC_ORIGIN}/api/eth`,
  oeth: `${RPC_ORIGIN}/api/oeth`,
  matic: `${RPC_ORIGIN}/api/MATIC`,
  gno: `${RPC_ORIGIN}/api/gno`,
  bnb: `${RPC_ORIGIN}/api/bnb`,
  arb1: `${RPC_ORIGIN}/api/arb1`,
  gor: `${RPC_ORIGIN}/api/gor`,
};
