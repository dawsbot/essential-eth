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
      { internalType: 'uint32', name: 'x', type: 'uint32' },
      { internalType: 'bool', name: 'y', type: 'bool' },
    ],
    name: 'baz',
    outputs: [{ internalType: 'bool', name: 'r', type: 'bool' }],
    type: 'function',
  },
];
