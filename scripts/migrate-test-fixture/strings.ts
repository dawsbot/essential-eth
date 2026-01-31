// Test fixture: string/UTF-8 and hex utilities
import { bytesToString, concatHex, size, slice, stringToBytes } from 'viem';

const bytes = stringToBytes('hello');
console.log('Bytes:', bytes);

const str = bytesToString(new Uint8Array([104, 101, 108, 108, 111]));
console.log('String:', str);

const combined = concatHex(['0xaa', '0xbb']);
console.log('Combined:', combined);

const sliced = slice('0xaabbccdd', 1, 3);
console.log('Sliced:', sliced);

const len = size('0xaabbccdd');
console.log('Length:', len);
