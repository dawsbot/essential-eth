import { hexlify } from '../../utils/bytes';
import { TransactionRequest } from './../../../lib/cjs/providers/types.d';
import { RPCTransactionRequest } from './../../types/Transaction.types';
import { BytesLike } from './../../utils/bytes';

export function prepareTransaction(
  transaction: TransactionRequest,
): RPCTransactionRequest {
  const preparedTransaction = {
    ...transaction,
  } as unknown as RPCTransactionRequest;
  (Object.keys(transaction) as Array<keyof TransactionRequest>).forEach(
    (key) => {
      if (!transaction[key]) return;
      switch (key) {
        case 'gas':
        case 'gasPrice':
        case 'value':
          if (typeof transaction[key] === 'number')
            preparedTransaction[key] = transaction[key].toString(16);
          else preparedTransaction[key] = transaction[key].toString();
          break;
        case 'data':
          preparedTransaction[key] = hexlify(transaction[key] as BytesLike);
          break;
      }
    },
  );
  return preparedTransaction;
}
