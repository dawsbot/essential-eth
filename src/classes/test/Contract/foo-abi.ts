// https://docs.soliditylang.org/en/v0.6.8/abi-spec.html#examples
// contract Foo {
// 	function bar(bytes3[2] memory) public pure {}
// 	function baz(uint32 x, bool y) public pure returns (bool r) { r = x > 32 || y; }
// 	function sam(bytes memory, bool, uint[] memory) public pure {}

import { JSONABI } from '../../..';

//     }
export const fooABI: JSONABI = [
  {
    inputs: [
      {
        internalType: 'bytes3[2]',
        name: 'memory',
        type: 'bytes3[2]',
      },
    ],
    name: 'bar',
    outputs: [],
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint32', name: 'x', type: 'uint32' },
      { internalType: 'bool', name: 'y', type: 'bool' },
    ],
    name: 'baz',
    outputs: [{ internalType: 'bool', name: 'r', type: 'bool' }],
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'bytes', name: 'memory', type: 'bytes' },
      { internalType: 'bool', name: '', type: 'bool' },
      { internalType: 'uint[]', name: 'memory', type: 'uint[]' },
    ],
    name: 'sam',
    outputs: [],
    type: 'function',
  },
];
