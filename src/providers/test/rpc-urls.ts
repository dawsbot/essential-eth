import z from 'zod';
export const fakeUrls = {
  notRPCButRealHttp: 'https://httpstat.us/200',
} as const;

const RPC_ORIGIN = process.env.RPC_ORIGIN;
if (!z.string().url().safeParse(RPC_ORIGIN).success) {
  throw new Error('RPC_ORIGIN is not defined or is invalid URL');
}

export const rpcUrls = {
  mainnet: `${RPC_ORIGIN}/api/eth`,
  matic: `${RPC_ORIGIN}/api/MATIC`,
  gno: `${RPC_ORIGIN}/api/gno`,
  bnb: `${RPC_ORIGIN}/api/bnb`,
  arb1: `${RPC_ORIGIN}/api/arb1`,
  gor: `${RPC_ORIGIN}/api/gor`,
};
