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
 */
export function cleanBlock(
  block: RPCBlock,
  returnTransactionObjects: boolean,
): BlockResponse {
  const cleanedBlock = { ...block } as unknown as BlockResponse;
  (Object.keys(block) as Array<keyof RPCBlock>).forEach((key) => {
    // pending blocks have null instead of a difficulty
    // pending blocks have null instead of a miner address
    if (
      !Object.prototype.hasOwnProperty.call(block, key) &&
      block[key] !== null
    )
      return;
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
