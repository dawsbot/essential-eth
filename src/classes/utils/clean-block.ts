import { BlockResponse, toChecksumAddress } from '../..';
import { RPCBlock } from '../../types/Block.types';
import { RPCTransaction } from '../../types/Transaction.types';
import { cleanTransaction } from './clean-transaction';
import { hexToDecimal } from './hex-to-decimal';

/**
 * Converts hex to decimal and checksum-addresses all addresses
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
      case 'gasLimit':
      case 'gasUsed':
      case 'number':
      case 'size':
      case 'timestamp':
      case 'baseFeePerGas':
        cleanedBlock[key] = Number(hexToDecimal(block[key]));
        break;
      case 'difficulty':
      case 'totalDifficulty':
        cleanedBlock[key] = hexToDecimal(block[key]);
        break;
      case 'miner':
        if (block[key]) {
          cleanedBlock[key] = toChecksumAddress(block[key]);
        }
        break;
    }
  });
  // for all full transactions
  if (returnTransactionObjects) {
    const txns = block.transactions as RPCTransaction[];
    // could be renamed "cleanTransaction" in the future
    txns.forEach((transaction, index) => {
      cleanedBlock.transactions[index] = cleanTransaction(transaction);
    });
  }
  return cleanedBlock;
}
