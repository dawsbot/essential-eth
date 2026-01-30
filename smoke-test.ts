/* eslint-disable no-console */
/**
 * Smoke test — exercises every runtime export from essential-eth.
 * Run: npx tsx smoke-test.ts
 */
import {
  // Utils – bytes
  arrayify,
  // Utils – crypto / address
  computeAddress,
  computePublicKey,
  concat,
  Contract,
  // New utils
  decodeBytes32String,
  encodeBytes32String,
  // Utils – conversions
  etherToGwei,
  etherToWei,
  FallthroughProvider,
  formatUnits,
  getAddress,
  gweiToEther,
  hashMessage,
  hexConcat,
  hexDataLength,
  hexDataSlice,
  hexlify,
  hexStripZeros,
  hexValue,
  hexZeroPad,
  id,
  isAddress,
  isBytes,
  isBytesLike,
  isHexString,
  JsonRpcProvider,
  jsonRpcProvider,
  keccak256,
  pack,
  parseUnits,
  solidityKeccak256,
  splitSignature,
  stripZeros,
  toChecksumAddress,
  toUtf8Bytes,
  toUtf8String,
  weiToEther,
  zeroPad,
} from 'essential-eth';

// ── helpers ─────────────────────────────────────────────────────────────────
let passed = 0;
let failed = 0;

function assert(label: string, condition: boolean, detail?: string) {
  if (condition) {
    console.log(`  ✅ ${label}`);
    passed++;
  } else {
    console.error(`  ❌ ${label}${detail ? ` — ${detail}` : ''}`);
    failed++;
  }
}

// ── conversions ─────────────────────────────────────────────────────────────
console.log('\n🔄 Conversions');

// etherToWei now returns bigint
const wei = etherToWei('1');
assert('etherToWei("1") returns bigint', typeof wei === 'bigint');
assert('etherToWei("1") = 10^18', wei === 1000000000000000000n);
assert('etherToWei("1.5")', etherToWei('1.5') === 1500000000000000000n);
assert(
  'etherToWei(1000)',
  etherToWei(1000).toString() === '1000000000000000000000',
);

// weiToEther now returns string
const ether = weiToEther('1000000000000000000');
assert('weiToEther returns string', typeof ether === 'string');
assert('weiToEther("10^18") = "1"', ether === '1');
assert(
  'weiToEther("1500000000000000000") = "1.5"',
  weiToEther('1500000000000000000') === '1.5',
);
assert('weiToEther(bigint)', weiToEther(1000000000000000000000n) === '1000');

// etherToGwei returns bigint
assert('etherToGwei("1")', etherToGwei('1') === 1000000000n);
assert(
  'etherToGwei("1").toString()',
  etherToGwei('1').toString() === '1000000000',
);

// gweiToEther returns string
assert('gweiToEther("1000000000")', gweiToEther('1000000000') === '1');

// ── bytes utilities ─────────────────────────────────────────────────────────
console.log('\n📦 Bytes utilities');

assert('arrayify(1)', arrayify(1)[0] === 1);
assert('arrayify(0x1234)', arrayify(0x1234).length === 2);
assert('concat([0,1])', concat([0, 1]).length === 2);
assert(
  'hexConcat([[2,4],9,"0x2934"])',
  hexConcat([[2, 4], 9, '0x2934']).startsWith('0x'),
);
assert('hexDataLength([2,4,0,1])', hexDataLength([2, 4, 0, 1]) === 4);
assert(
  'hexDataSlice([20,6,48],0,2)',
  hexDataSlice([20, 6, 48], 0, 2) === '0x1406',
);
assert('hexlify(4)', hexlify(4) === '0x04');
assert('hexlify(14)', hexlify(14) === '0x0e');
assert('hexlify(bigint)', hexlify(255n) === '0xff');
assert('hexStripZeros([0,0,0,48])', hexStripZeros([0, 0, 0, 48]) === '0x30');
assert('hexValue(39)', hexValue(39) === '0x27');
assert('hexValue(bigint)', hexValue(255n) === '0xff');
assert('hexZeroPad("0x60",2)', hexZeroPad('0x60', 2) === '0x0060');
assert('isBytes([1,2,3])', isBytes([1, 2, 3]) === true);
assert('isBytes(false)', isBytes(false) === false);
assert('isBytesLike([1,2,3])', isBytesLike([1, 2, 3]) === true);
assert('isBytesLike(false)', isBytesLike(false) === false);
assert('isHexString("0x4924")', isHexString('0x4924') === true);
assert('isHexString("nope")', isHexString('nope') === false);
assert('stripZeros("0x00002834")', stripZeros('0x00002834').length === 2);
assert('zeroPad([39,25,103,45],5)', zeroPad([39, 25, 103, 45], 5).length === 5);

// ── crypto / address utilities ──────────────────────────────────────────────
console.log('\n🔐 Crypto & address utilities');

assert(
  'keccak256("0x123")',
  keccak256('0x123') ===
    '0x5fa2358263196dbbf23d1ca7a509451f7a2f64c15837bfbb81298b1e3e24e4fa',
);
assert(
  'hashMessage("Hello World")',
  hashMessage('Hello World') ===
    '0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2',
);
assert(
  'toChecksumAddress',
  toChecksumAddress('0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359') ===
    '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
);
assert(
  'isAddress (valid)',
  isAddress('0xc0deaf6bd3f0c6574a6a625ef2f22f62a5150eab') === true,
);
assert('isAddress (invalid)', isAddress('bad') === false);
assert('toUtf8Bytes("eth")', toUtf8Bytes('eth').length === 3);
assert(
  'computePublicKey',
  computePublicKey(
    '0xb27cc8dea0177d910110e8d3ec5480d56c723abf433529f4063f261ffdb9297c',
  ).startsWith('0x04'),
);
assert(
  'computeAddress (from private key)',
  computeAddress(
    '0x2f2c419acf4a1da8c1ebea75bb3fcfbd3ec2aa3bf0162901ccdc2f38b8f92427',
  ) === '0xA2902059a7BF992f1450BACD7357CCAa5cC8336a',
);
assert(
  'pack (bool, string, uint64)',
  pack(['bool', 'string', 'uint64'], [true, 'text', 30]) ===
    '0x0174657874000000000000001e',
);
assert(
  'solidityKeccak256',
  solidityKeccak256(
    ['string', 'bool', 'uint32'],
    ['essential-eth is great', true, 14],
  ) === '0xe4d4c8e809faac09d58f468f0aeab9474fe8965d554c6c0f868c433c3fd6acab',
);

const sig =
  '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee331b';
const split = splitSignature(sig);
assert('splitSignature .v', split.v === 27);
assert(
  'splitSignature .r',
  split.r ===
    '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b39716',
);

// ── new utils ───────────────────────────────────────────────────────────────
console.log('\n🆕 New utilities');

assert('formatUnits (USDC 6 decimals)', formatUnits(1500000n, 6) === '1.5');
assert('parseUnits (USDC 6 decimals)', parseUnits('1.5', 6) === 1500000n);
assert('formatUnits default 18', formatUnits(1000000000000000000n) === '1');
assert('parseUnits default 18', parseUnits('1') === 1000000000000000000n);
assert(
  'id (Transfer event topic)',
  id('Transfer(address,address,uint256)') ===
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
);
assert(
  'id (function selector)',
  id('balanceOf(address)').slice(0, 10) === '0x70a08231',
);
assert(
  'getAddress',
  getAddress('0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359') ===
    '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
);
assert('toUtf8String', toUtf8String(new Uint8Array([101, 116, 104])) === 'eth');
assert('toUtf8String (hex)', toUtf8String('0x657468') === 'eth');
assert('encodeBytes32String', encodeBytes32String('hello').length === 66);
assert(
  'decodeBytes32String roundtrip',
  decodeBytes32String(encodeBytes32String('hello')) === 'hello',
);

// ── providers (construction only — no network calls) ────────────────────────
console.log('\n🌐 Providers (construction only)');

const provider = new JsonRpcProvider('https://example.com');
assert('new JsonRpcProvider', provider != null);

const provider2 = jsonRpcProvider('https://example.com');
assert('jsonRpcProvider()', provider2 != null);

const fallthrough = new FallthroughProvider([
  'https://example.com',
  'https://example2.com',
]);
assert('new FallthroughProvider', fallthrough != null);

// ── contract (construction only) ────────────────────────────────────────────
console.log('\n📜 Contract (construction only)');

const abi = [
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'isClaimed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view' as const,
    type: 'function' as const,
  },
];
const contract = new Contract(
  '0x090D4613473dEE047c3f2706764f49E0821D256e',
  abi,
  provider,
);
assert('new Contract', contract != null);
assert(
  'contract.isClaimed is function',
  typeof contract.isClaimed === 'function',
);

// ── summary ─────────────────────────────────────────────────────────────────
console.log(`\n${'═'.repeat(50)}`);
console.log(`  ${passed} passed, ${failed} failed`);
console.log(`${'═'.repeat(50)}\n`);

process.exit(failed > 0 ? 1 : 0);
