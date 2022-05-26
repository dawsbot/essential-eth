import { tinyBig, toChecksumAddress } from '../..';
import {
  Log,
  RPCLog,
  RPCTransactionReceipt,
  TransactionReceipt,
} from '../../types/Transaction.types';
import { cleanLog } from './clean-log';
import { cleanTransaction } from './clean-transaction';
import { hexToDecimal } from './hex-to-decimal';

/**
 * Converts RPC transaction receipt response to more JS-friendly format
 */
export function cleanTransactionReceipt(
  transactionReceipt: RPCTransactionReceipt,
): TransactionReceipt {
  const cleanedTransaction = cleanTransaction(transactionReceipt as any);
  const cleanedTransactionReceipt = {
    ...cleanedTransaction,
  } as unknown as TransactionReceipt;
  (
    Object.keys(transactionReceipt) as Array<keyof RPCTransactionReceipt>
  ).forEach((key) => {
    if (!transactionReceipt[key]) return;
    switch (key) {
      case 'status':
        cleanedTransactionReceipt[key] = Number(
          hexToDecimal(transactionReceipt[key]),
        );
        break;
      case 'contractAddress':
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
        transactionReceipt[key].forEach((log: RPCLog, index: number) => {
          cleanedTransactionReceipt[key][index] = cleanLog(log, true) as Log;
        });
    }
  });
  cleanedTransactionReceipt.byzantium =
    cleanedTransactionReceipt.blockNumber >= 4370000;
  return cleanedTransactionReceipt;
}
