import { toChecksumAddress } from '../..';
import { RPCTransaction, Transaction } from '../../types/transaction.types';
import { hexToDecimal } from './hex-to-decimal';

/**
 * Converts hex to decimal and checksum-addresses all addresses
 */
export function cleanTransaction(transaction: RPCTransaction): Transaction {
  const cleanedTransaction: any = { ...transaction };
  (Object.keys(transaction) as Array<keyof RPCTransaction>).forEach((key) => {
    // pending blocks have null instead of a difficulty
    // pending blocks have null instead of a miner address
    if (!transaction[key]) return;
    switch (key) {
      case 'blockNumber':
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
