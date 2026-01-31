// Test fixture: ABI encoding and event utilities
import {
  decodeFunctionResult,
  encodeFunctionData,
  toEventHash,
  toEventSignature,
} from 'viem';

const abi = [
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
] as const;

const encoded = encodeFunctionData({
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'],
});
console.log('Encoded:', encoded);

const decoded = decodeFunctionResult({
  abi,
  functionName: 'balanceOf',
  data: '0x0000000000000000000000000000000000000000000000000000000000000001',
});
console.log('Decoded:', decoded);

const sig = toEventSignature('Transfer(address,address,uint256)');
console.log('Event signature:', sig);

const topic = toEventHash('Transfer(address,address,uint256)');
console.log('Event topic:', topic);
