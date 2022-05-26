import { tinyBig, toChecksumAddress } from '../..';
import {
  RPCLog,
  RPCTransactionReceipt,
  TransactionReceipt,
} from '../../types/Transaction.types';
import { cleanTransaction } from './clean-transaction';
import { hexToDecimal } from './hex-to-decimal';

/**
 * Converts RPC transaction receipt response to more JS-friendly format
 *
 * @param transactionReceipt
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
          (Object.keys(log) as Array<keyof RPCLog>).forEach((logKey) => {
            switch (logKey) {
              case 'address':
                cleanedTransactionReceipt[key][index][logKey] =
                  toChecksumAddress(log[logKey]);
                break;
              case 'blockNumber':
              case 'logIndex':
              case 'transactionIndex':
                cleanedTransactionReceipt[key][index][logKey] = Number(
                  hexToDecimal(log[logKey]),
                );
                break;
              case 'removed':
                delete log[logKey];
                break;
            }
          });
        });
    }
  });
  cleanedTransactionReceipt.byzantium =
    cleanedTransactionReceipt.blockNumber >= 4370000;
  return cleanedTransactionReceipt;
}
