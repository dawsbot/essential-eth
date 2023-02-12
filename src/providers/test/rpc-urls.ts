export const fakeUrls = {
  notRPCButRealHttp: 'https://httpstat.us/200',
} as const;

export const rpcUrls = {
  mainnet: `${process.env.RPC_ORIGIN}/api/eth`,
  matic: `${process.env.RPC_ORIGIN}/api/matic`,
  gno: `${process.env.RPC_ORIGIN}/api/gno`,
  bnb: `${process.env.RPC_ORIGIN}/api/bnb`,
  arb1: `${process.env.RPC_ORIGIN}/api/arb1`,
  gor: `${process.env.RPC_ORIGIN}/api/gor`,
};
