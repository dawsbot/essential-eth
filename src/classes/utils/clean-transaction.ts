import { toChecksumAddress } from '../..';
import {
  RPCTransaction,
  TransactionResponse,
} from '../../types/Transaction.types';
import { hexToDecimal } from './hex-to-decimal';

/**
 * Converts RPC transaction response to more JS-friendly format
 */
export function cleanTransaction(
  transaction: RPCTransaction,
): TransactionResponse {
  const cleanedTransaction = {
    ...transaction,
  } as unknown as TransactionResponse;
  (Object.keys(transaction) as Array<keyof RPCTransaction>).forEach((key) => {
    // pending blocks have null instead of a difficulty
    // pending blocks have null instead of a miner address
    if (!transaction[key]) return;
    switch (key) {
      case 'blockNumber':
      case 'chainId':
      case 'gas':
      case 'nonce':
      case 'transactionIndex':
      case 'type':
        cleanedTransaction[key] = Number(hexToDecimal(transaction[key]));
        break;
      case 'gasPrice':
      case 'value':
        cleanedTransaction[key] = hexToDecimal(transaction[key]);
        break;
      case 'from':
      case 'to':
        if (transaction[key]) {
          cleanedTransaction[key] = toChecksumAddress(transaction[key]);
        }
        break;
    }
  });
  return cleanedTransaction;
}
