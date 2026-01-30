import { hexlify } from '../../utils/bytes';
import type {
  RPCTransactionRequest,
  TransactionRequest,
} from './../../types/Transaction.types';
import type { BytesLike } from './../../utils/bytes';

/**
 * @param transaction
 * @example
 */
export function prepareTransaction(
  transaction: TransactionRequest,
): RPCTransactionRequest {
  const preparedTransaction = {
    ...transaction,
  } as unknown as RPCTransactionRequest;
  (Object.keys(transaction) as Array<keyof TransactionRequest>).forEach(
    (key) => {
      switch (key) {
        case 'gas':
        case 'gasPrice':
        case 'nonce':
        case 'maxFeePerGas':
        case 'maxPriorityFeePerGas':
        case 'value': {
          const value = transaction[key];
          if (typeof value === 'bigint') {
            preparedTransaction[key] = '0x' + value.toString(16);
          } else if (typeof value === 'number') {
            preparedTransaction[key] = '0x' + value.toString(16);
          } else {
            preparedTransaction[key] = (value as any).toString();
          }
          break;
        }
        case 'data':
          preparedTransaction[key] = hexlify(transaction[key] as BytesLike);
          break;
      }
    },
  );
  return preparedTransaction;
}
