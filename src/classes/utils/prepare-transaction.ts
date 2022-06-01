import { hexlify } from '../../utils/bytes';
import {
  RPCTransactionRequest,
  TransactionRequest,
} from './../../types/Transaction.types';
import { BytesLike } from './../../utils/bytes';

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
      if (
        !Object.prototype.hasOwnProperty.call(transaction, key) &&
        transaction[key] !== null
      )
        return;
      switch (key) {
        case 'gas':
        case 'gasPrice':
        case 'value':
          if (typeof transaction[key] === 'number')
            preparedTransaction[key] =
              '0x' + (transaction[key] as any).toString(16);
          else preparedTransaction[key] = (transaction[key] as any).toString();
          break;
        case 'data':
          preparedTransaction[key] = hexlify(transaction[key] as BytesLike);
          break;
      }
    },
  );
  return preparedTransaction;
}
