import type { JSONABI } from '../../../types/Contract.types';

// https://github.com/jk-labs-inc/jokerace/blob/2c92a4ba052d3c4bbf4b2a768ed43d28c90df160/packages/forge/src/governance/Governor.sol#L214-L216
export const abi: JSONABI = [
  {
    payable: false,
    name: 'getAllAddressesThatHaveVoted',
    outputs: [{ type: 'address[]', name: '' }],
    inputs: [],
    type: 'function',
    stateMutability: 'view',
  },
  {
    payable: false,
    name: 'getAllProposalIds',
    outputs: [{ type: 'uint256[]', name: '' }],
    inputs: [],
    type: 'function',
    stateMutability: 'view',
  },
];
