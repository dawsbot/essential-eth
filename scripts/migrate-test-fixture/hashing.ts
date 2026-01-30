// Test fixture: mix of supported and unsupported imports
import { keccak256, encodePacked, hashMessage } from 'viem';
import { createPublicClient, http } from 'viem';

const packed = encodePacked(['address', 'uint256'], ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 1n]);
const hash = keccak256(packed);
console.log('Hash:', hash);

const msgHash = hashMessage('hello world');
console.log('Message hash:', msgHash);

// This uses unsupported viem features
const client = createPublicClient({ transport: http('https://rpc.ankr.com/eth') });
console.log('Client:', client);
