import type { JSONABI } from '../../../types/Contract.types';

export const abi: JSONABI = [
  {
    name: 'getAllAddressesThatHaveVoted',
    outputs: [{ type: 'address[]', name: '' }],
    inputs: [],
    type: 'function',
  },
];
