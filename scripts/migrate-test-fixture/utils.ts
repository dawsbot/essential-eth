// Test fixture: all symbols should be fully migratable
import { formatEther, parseEther, isAddress, getAddress } from 'viem';

const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

const checksummed = getAddress(address);
console.log('Is valid:', isAddress(address));
console.log('Checksummed:', checksummed);

const wei = parseEther('1.5');
console.log('Wei:', wei);

const ether = formatEther(wei);
console.log('Ether:', ether);
