import { BlockResponse, toChecksumAddress } from '../..';
import { tinyBig } from '../../shared/tiny-big/tiny-big';
import { RPCBlock } from '../../types/Block.types';
import { RPCTransaction } from '../../types/Transaction.types';
import { cleanTransaction } from './clean-transaction';
import { hexToDecimal } from './hex-to-decimal';

/**
 * Converts RPC block response to more JS-friendly format
 *
 * @param block the RPCBlock to clean
 * @param returnTransactionObjects whether or not to return the transactions specified in this block
 * @returns a cleaned block
 * @example
 * ```js
 * const rpcBlock = {
 *   number: '0x40f9de',
 *   hash: '0x4cbaa942e48a91108f38e2a250f6dbaff7fffe3027f5ebf76701929eed2b2970',
 *   parentHash: '0xc8de1e513f74cbc5cc77e2a39e4cada6504469a5d0e87200b708319c1e9ef154',
 *   sha3Uncles: '0x04d250716296c9662314b37c112e5ce8b1c9ad7fd7820a39482a3688a2078f2b',
 *   logsBloom: '0x0000400004000000040010100200000000000000000000000000000000000000001000000001000000000000000000000004010000000000000a800000000000040000000001000400000000000000000000000000000000000002000000000000000000000004000040000000800000000001000000000000000000000000000000000000000001000000000004200000000000000000000000000124400000000000000200100020000000000000000080000000000080001000000000000000000081000000000000000000008000000020000100000000200020100800000000000000000008002000000080001000020c00000000000000200000000000',
 *   transactionsRoot: '0xfc79f4f620cb69861ac67ceee5e1ddf3e45da95be230d4064be234f1ee491aa5',
 *   stateRoot: '0xfa5ef7e368997d70670b0ea3172aabefc2dee285786ce69c7165d8d854f8b292',
 *   receiptsRoot: '0x7fa0679e88fef8a8f7f5865dc4e6000ddcc267b14d2904948e3b1576a18a3bbd',
 *   miner: '0x1b7a75ef070ff49e6b9491a26403d799f2099ebd',
 *   difficulty: '0x47ede14fcbe635706e',
 *   totalDifficulty: '0x139e1de9b8404dedc5d30959',
 *   extraData: '0xce018c495249532d62613031656132',
 *   size: '0xb4f',
 *   gasLimit: '0x67c280',
 *   gasUsed: '0x56e2d',
 *   timestamp: '0x62648dc2',
 *   transactions: [
 *     '0xd53800afc69e55cc7a64b927803b46a5b4c5ddccbaafb6b32fe0ec883739b825',
 *     '0x4b8b07f35a1f911a80a0ffeebe3d3c41cd393b4d5e1ce0a408026705913d6760',
 *     '0xa50eac0ea8005cb1e4b95be4e64c24035d9c41adb164c49477c3169870f02fb1',
 *     '0x413e5293786f8b63e73adf0b74ab56067da4b564d01936b88b138d48cc414a42',
 *     '0xd4e4969365d144b0b987632dca36ba9e272254bdc687245987a57666d6afa148'
 *   ],
 *   uncles: [
 *     '0x36cd3869fd17a285b984dea8b705d34096e1fbdfe48df69ae530fbe921ba83fa'
 *   ],
 *   minimumGasPrice: '0x387ee40',
 *   bitcoinMergedMiningHeader: '0x0040502d717ae205da048b0ffb8e110603564d8677ca8bd3a54601000000000000000000e722e86bfebcae00bffb46c663fa0241b63a27f0c98fa710e421d5cc1afa2448d08d6462d9f809172f5e30aa',
 *   bitcoinMergedMiningCoinbaseTransaction: '0x00000000000001003f8757a906f0159f882f0968788a2e396b7bf8090e1b926fb2bb46789ac32d55082aca4e0800000000000000002b6a2952534b424c4f434b3a831a30935da1bd1e8631942fc7fa78f7a7b11d51ca39a1684d91a81f0040f9de00000000',
 *   bitcoinMergedMiningMerkleProof: '0xb53111a4e11bc19bf90268485d1b957d908ebc6a4cd9862aca3fc6ed3dcf3240b14c316de8521369d55dbfeb2b0116bcc10f40e999c4885e1bd2a08691bdea1c43862d590390a227a379d5677b958f1a23eecc16ac590ad675b8a4cea0c10da3ef597acb9ca1fe0a21fc408f09e0c7169d83aca8ddd636d8cc155f922e1d36c74b7cc11e9ee98dd1bf2100a55d59630c65da3db1575d58f165c5753c1779df90efcff9017b73cc32f4c87178bd0eae6a6dd0357047be70d6c4af17fcef097e80a9f1751447f4eee3831fc79f2d894934694149bcb99840a525f5128215eca6b54642af452ee7568a9281f40560afffd35725df31b98155d7813dea12e42f2a8052c7d98bcf62c9cdc66c40fb12b729b685a31aec4970ea5316640691ae5eb616808656a2bde4e9f5920ff178bf9d1f84e96a0d0bd048a3a8ca0d60970d02aacf7ecfb6e7feaec5c4a764873531cfd630e9430840cfe8b88154da25d6b94b706fe678d0efc1ecafed5a1f539e34552bea65622513b663e17e121f3c4548942584',
 *   hashForMergedMining: '0x831a30935da1bd1e8631942fc7fa78f7a7b11d51ca39a1684d91a81f0040f9de',
 *   paidFees: '0x1fb451615b58',
 *   cumulativeDifficulty: '0x8fdbe015f7248cf993'
 * };
 * const returnTransactionObjects = false;
 *
 * await cleanBlock(rpcBlock, returnTransactionObjects);
 * // {
 * //   number: 4258270,
 * //   hash: '0x4cbaa942e48a91108f38e2a250f6dbaff7fffe3027f5ebf76701929eed2b2970',
 * //   parentHash: '0xc8de1e513f74cbc5cc77e2a39e4cada6504469a5d0e87200b708319c1e9ef154',
 * //   sha3Uncles: '0x04d250716296c9662314b37c112e5ce8b1c9ad7fd7820a39482a3688a2078f2b',
 * //   logsBloom: '0x0000400004000000040010100200000000000000000000000000000000000000001000000001000000000000000000000004010000000000000a800000000000040000000001000400000000000000000000000000000000000002000000000000000000000004000040000000800000000001000000000000000000000000000000000000000001000000000004200000000000000000000000000124400000000000000200100020000000000000000080000000000080001000000000000000000081000000000000000000008000000020000100000000200020100800000000000000000008002000000080001000020c00000000000000200000000000',
 * //   transactionsRoot: '0xfc79f4f620cb69861ac67ceee5e1ddf3e45da95be230d4064be234f1ee491aa5',
 * //   stateRoot: '0xfa5ef7e368997d70670b0ea3172aabefc2dee285786ce69c7165d8d854f8b292',
 * //   receiptsRoot: '0x7fa0679e88fef8a8f7f5865dc4e6000ddcc267b14d2904948e3b1576a18a3bbd',
 * //   miner: '0x1b7A75Ef070Ff49E6B9491a26403D799f2099EbD',
 * //   difficulty: Big {
 * //     s: 1,
 * //     e: 21,
 * //     c: [Array],
 * //     constructor: [Function],
 * //     padAndChop: [Function (anonymous)]
 * //   },
 * //   totalDifficulty: Big {
 * //     s: 1,
 * //     e: 27,
 * //     c: [Array],
 * //     constructor: [Function],
 * //     padAndChop: [Function (anonymous)]
 * //   },
 * //   extraData: '0xce018c495249532d62613031656132',
 * //   size: Big {
 * //     s: 1,
 * //     e: 3,
 * //     c: [Array],
 * //     constructor: [Function],
 * //     padAndChop: [Function (anonymous)]
 * //   },
 * //   gasLimit: Big {
 * //     s: 1,
 * //     e: 6,
 * //     c: [Array],
 * //     constructor: [Function],
 * //     padAndChop: [Function (anonymous)]
 * //   },
 * //   gasUsed: Big {
 * //     s: 1,
 * //     e: 5,
 * //     c: [Array],
 * //     constructor: [Function],
 * //     padAndChop: [Function (anonymous)]
 * //   },
 * //   timestamp: Big {
 * //     s: 1,
 * //     e: 9,
 * //     c: [Array],
 * //     constructor: [Function],
 * //     padAndChop: [Function (anonymous)]
 * //   },
 * //   transactions: [
 * //     '0xd53800afc69e55cc7a64b927803b46a5b4c5ddccbaafb6b32fe0ec883739b825',
 * //     '0x4b8b07f35a1f911a80a0ffeebe3d3c41cd393b4d5e1ce0a408026705913d6760',
 * //     '0xa50eac0ea8005cb1e4b95be4e64c24035d9c41adb164c49477c3169870f02fb1',
 * //     '0x413e5293786f8b63e73adf0b74ab56067da4b564d01936b88b138d48cc414a42',
 * //     '0xd4e4969365d144b0b987632dca36ba9e272254bdc687245987a57666d6afa148'
 * //   ],
 * //   uncles: [
 * //     '0x36cd3869fd17a285b984dea8b705d34096e1fbdfe48df69ae530fbe921ba83fa'
 * //   ],
 * //   minimumGasPrice: '0x387ee40',
 * //   bitcoinMergedMiningHeader: '0x0040502d717ae205da048b0ffb8e110603564d8677ca8bd3a54601000000000000000000e722e86bfebcae00bffb46c663fa0241b63a27f0c98fa710e421d5cc1afa2448d08d6462d9f809172f5e30aa',
 * //   bitcoinMergedMiningCoinbaseTransaction: '0x00000000000001003f8757a906f0159f882f0968788a2e396b7bf8090e1b926fb2bb46789ac32d55082aca4e0800000000000000002b6a2952534b424c4f434b3a831a30935da1bd1e8631942fc7fa78f7a7b11d51ca39a1684d91a81f0040f9de00000000',
 * //   bitcoinMergedMiningMerkleProof: '0xb53111a4e11bc19bf90268485d1b957d908ebc6a4cd9862aca3fc6ed3dcf3240b14c316de8521369d55dbfeb2b0116bcc10f40e999c4885e1bd2a08691bdea1c43862d590390a227a379d5677b958f1a23eecc16ac590ad675b8a4cea0c10da3ef597acb9ca1fe0a21fc408f09e0c7169d83aca8ddd636d8cc155f922e1d36c74b7cc11e9ee98dd1bf2100a55d59630c65da3db1575d58f165c5753c1779df90efcff9017b73cc32f4c87178bd0eae6a6dd0357047be70d6c4af17fcef097e80a9f1751447f4eee3831fc79f2d894934694149bcb99840a525f5128215eca6b54642af452ee7568a9281f40560afffd35725df31b98155d7813dea12e42f2a8052c7d98bcf62c9cdc66c40fb12b729b685a31aec4970ea5316640691ae5eb616808656a2bde4e9f5920ff178bf9d1f84e96a0d0bd048a3a8ca0d60970d02aacf7ecfb6e7feaec5c4a764873531cfd630e9430840cfe8b88154da25d6b94b706fe678d0efc1ecafed5a1f539e34552bea65622513b663e17e121f3c4548942584',
 * //   hashForMergedMining: '0x831a30935da1bd1e8631942fc7fa78f7a7b11d51ca39a1684d91a81f0040f9de',
 * //   paidFees: '0x1fb451615b58',
 * //   cumulativeDifficulty: '0x8fdbe015f7248cf993'
 * // }
 */
export function cleanBlock(
  block: RPCBlock,
  returnTransactionObjects: boolean,
): BlockResponse {
  const cleanedBlock = { ...block } as unknown as BlockResponse;
  (Object.keys(block) as Array<keyof RPCBlock>).forEach((key) => {
    // pending blocks have null instead of a difficulty
    // pending blocks have null instead of a miner address
    if (!block[key]) return;
    switch (key) {
      case 'difficulty':
      case 'totalDifficulty':
      case 'gasLimit':
      case 'gasUsed':
      case 'size':
      case 'timestamp':
      case 'baseFeePerGas':
        cleanedBlock[key] = tinyBig(hexToDecimal(block[key]));
        break;
      case 'number':
        cleanedBlock[key] = Number(hexToDecimal(block[key]));
        break;
      case 'miner':
        cleanedBlock[key] = toChecksumAddress(block[key]);
        break;
    }
  });
  // for all full transactions
  if (returnTransactionObjects) {
    const txns = block.transactions as RPCTransaction[];
    txns.forEach((transaction, index) => {
      cleanedBlock.transactions[index] = cleanTransaction(transaction);
    });
  }
  return cleanedBlock;
}
