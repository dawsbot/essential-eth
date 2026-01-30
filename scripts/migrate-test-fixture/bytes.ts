// Test fixture: byte utilities with renames
import { toHex, toBytes, isHex, concat, isBytes } from 'viem';

const data = toBytes('0x1234');
console.log('Is bytes:', isBytes(data));

const hex = toHex(data);
console.log('Is hex:', isHex(hex));

const combined = concat([toBytes('0xaa'), toBytes('0xbb')]);
console.log('Combined:', toHex(combined));
