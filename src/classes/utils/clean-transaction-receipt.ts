import { tinyBig, toChecksumAddress } from '../..';
import {
  RPCTransactionReceipt,
  TransactionReceipt,
} from '../../types/Transaction.types';
import { hexToDecimal } from './hex-to-decimal';

/**
 * Converts RPC transaction receipt response to more JS-friendly format
 */
export function cleanTransactionReceipt(
  transactionReceipt: RPCTransactionReceipt,
): TransactionReceipt {
  const cleanedTransactionReceipt = {
    ...transactionReceipt,
  } as unknown as TransactionReceipt;
  (
    Object.keys(transactionReceipt) as Array<keyof RPCTransactionReceipt>
  ).forEach((key) => {
    if (!transactionReceipt[key]) return;
    switch (key) {
      case 'blockNumber':
      case 'status':
      case 'transactionIndex':
      case 'type':
        cleanedTransactionReceipt[key] = Number(
          hexToDecimal(transactionReceipt[key]),
        );
        break;
      case 'contractAddress':
      case 'from':
      case 'to':
        if (transactionReceipt[key]) {
          cleanedTransactionReceipt[key] = toChecksumAddress(
            transactionReceipt[key],
          );
        }
        break;
      case 'cumulativeGasUsed':
      case 'effectiveGasPrice':
      case 'gasUsed':
        cleanedTransactionReceipt[key] = tinyBig(
          hexToDecimal(transactionReceipt[key]),
        );
        break;
      case 'logs':
    }
  });
  cleanedTransactionReceipt.byzantium =
    cleanedTransactionReceipt.blockNumber >= 4370000;
  return cleanedTransactionReceipt;
}