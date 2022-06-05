import { tinyBig, toChecksumAddress } from '../..';
import {
  RPCTransaction,
  TransactionResponse,
} from '../../types/Transaction.types';
import { hexToDecimal } from './hex-to-decimal';

/**
 * Converts RPC transaction response to more JS-friendly format
 *
 * @param transaction the transaction to clean
 * @returns a cleaned transaction
 * @example
 * ```javascript
 * const RPCTransaction = { accessList: [], blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: '0xe28f62', chainId: '0x1', from: '0x642824fab1d0141073ed74326332950bec4701e3', gas: '0x274b7', gasPrice: '0x62df1c62c', hash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', input: '0xa0712d68000000000000000000000000000000000000000000000000000000000000000a', maxFeePerGas: '0x98808e3f0', maxPriorityFeePerGas: '0x3b9aca00', nonce: '0x42', r: '0x304682f8b22006dd1347c3722f6e43a5ad8e3a1ae51939cc0d6f07981602f5c0', s: '0x207ad110eb5c014cb628814b92396785fabfbe74542293300eeadf156f50f105', to: '0x84f80ea01e26b7c11bdd241970982c7eeab6ddcc', transactionIndex: '0x29', type: '0x2', v: '0x1', value: '0x470de4df820000' }
 * cleanTransaction(RPCTransaction);
 * // { accessList: [], blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, chainId: 1, from: '0x642824FaB1D0141073ed74326332950bEc4701e3', gas: Big { s: 1, e: 5, c: [ 1, 6, 0, 9, 5, 1 ], constructor: { [λ: Big] DP: 20, RM: 1, NE: -7, PE: 21, strict: false, roundDown: 0, roundHalfUp: 1, roundHalfEven: 2, roundUp: 3, Big: [Circular], default: [Circular] }, padAndChop: [λ] }, gasPrice: Big { s: 1, e: 10, c: [ 2, 6, 5, 4, 0, 6, 2, 3, 4, 0, 4 ], constructor: { [λ: Big] DP: 20, RM: 1, NE: -7, PE: 21, strict: false, roundDown: 0, roundHalfUp: 1, roundHalfEven: 2, roundUp: 3, Big: [Circular], default: [Circular] }, padAndChop: [λ] }, hash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', input: '0xa0712d68000000000000000000000000000000000000000000000000000000000000000a', maxFeePerGas: Big { s: 1, e: 10, c: [ 4, 0, 9, 3, 6, 9, 8, 9, 6, 8 ], constructor: { [λ: Big] DP: 20, RM: 1, NE: -7, PE: 21, strict: false, roundDown: 0, roundHalfUp: 1, roundHalfEven: 2, roundUp: 3, Big: [Circular], default: [Circular] }, padAndChop: [λ] }, maxPriorityFeePerGas: Big { s: 1, e: 9, c: [ 1 ], constructor: { [λ: Big] DP: 20, RM: 1, NE: -7, PE: 21, strict: false, roundDown: 0, roundHalfUp: 1, roundHalfEven: 2, roundUp: 3, Big: [Circular], default: [Circular] }, padAndChop: [λ] }, nonce: 66, r: '0x304682f8b22006dd1347c3722f6e43a5ad8e3a1ae51939cc0d6f07981602f5c0', s: '0x207ad110eb5c014cb628814b92396785fabfbe74542293300eeadf156f50f105', to: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', transactionIndex: 41, type: 2, v: 1, value: Big { s: 1, e: 16, c: [ 2 ], constructor: { [λ: Big] DP: 20, RM: 1, NE: -7, PE: 21, strict: false, roundDown: 0, roundHalfUp: 1, roundHalfEven: 2, roundUp: 3, Big: [Circular], default: [Circular] }, padAndChop: [λ] }, confirmations: 53 }
 * ```
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
      case 'transactionIndex':
      case 'type':
      case 'v':
        cleanedTransaction[key] = Number(hexToDecimal(transaction[key]));
        break;
      case 'from':
      case 'to':
        if (transaction[key]) {
          cleanedTransaction[key] = toChecksumAddress(transaction[key]);
        }
        break;
      case 'value':
      case 'gas':
      case 'gasPrice':
      case 'maxFeePerGas':
      case 'maxPriorityFeePerGas':
      case 'nonce':
        cleanedTransaction[key] = tinyBig(hexToDecimal(transaction[key]));
        break;
    }
  });
  return cleanedTransaction;
}
