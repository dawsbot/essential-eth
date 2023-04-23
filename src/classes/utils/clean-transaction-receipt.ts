import { tinyBig } from '../../shared/tiny-big/tiny-big';
import type {
  Log,
  RPCLog,
  RPCTransactionReceipt,
  TransactionReceipt,
} from '../../types/Transaction.types';
import { toChecksumAddress } from '../../utils/to-checksum-address';
import { cleanLog } from './clean-log';
import { cleanTransaction } from './clean-transaction';
import { hexToDecimal } from './hex-to-decimal';

/**
 * Converts RPC transaction receipt response to more JS-friendly format
 * @param transactionReceipt the transaction receipt to clean
 * @returns a cleaned transaction receipt
 * @example
 * ```javascript
 * const RPCTransactionReceipt = { blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: '0xe28f62', contractAddress: null, cumulativeGasUsed: '0x37a2b9', effectiveGasPrice: '0x62df1c62c', from: '0x642824fab1d0141073ed74326332950bec4701e3', gasUsed: '0x1a325', logs: [ { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 84, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x000000000000000000000000000000000000000000000000000000000000074d' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 85, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x000000000000000000000000000000000000000000000000000000000000074e' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 86, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x000000000000000000000000000000000000000000000000000000000000074f' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 87, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000750' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 88, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000751' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 89, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000752' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 90, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000753' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 91, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000754' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 92, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000755' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 93, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000756' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 } ], logsBloom: '0x20000080004000000000000400000000000001000000000400000000000000000000000000000000000000000008000000000000000000000000000000004000000000000008000000000008000000010080000014000004000000000000000000100000020800000000000000001800000080000000002000000010000000000000000000000200000200000000002000000000000400000000000000000000000000000000000000000040000000000000000100000000000000000000040002100002000000000000080000000000000100000002000000040000001220000000000000000000000000000000000000000000000000000000000000004000', status: '0x1', to: '0x84f80ea01e26b7c11bdd241970982c7eeab6ddcc', transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: '0x29', type: '0x2' }
 * cleanTransactionReceipt(RPCTransactionReceipt);
 * // { blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, contractAddress: null, cumulativeGasUsed: Big { s: 1, e: 6, c: [ 3, 6, 4, 6, 1, 3, 7 ], constructor: { [λ: Big] DP: 20, RM: 1, NE: -7, PE: 21, strict: false, roundDown: 0, roundHalfUp: 1, roundHalfEven: 2, roundUp: 3, Big: [Circular], default: [Circular] }, padAndChop: [λ] }, effectiveGasPrice: Big { s: 1, e: 10, c: [ 2, 6, 5, 4, 0, 6, 2, 3, 4, 0, 4 ], constructor: { [λ: Big] DP: 20, RM: 1, NE: -7, PE: 21, strict: false, roundDown: 0, roundHalfUp: 1, roundHalfEven: 2, roundUp: 3, Big: [Circular], default: [Circular] }, padAndChop: [λ] }, from: '0x642824FaB1D0141073ed74326332950bEc4701e3', gasUsed: Big { s: 1, e: 5, c: [ 1, 0, 7, 3, 0, 1 ], constructor: { [λ: Big] DP: 20, RM: 1, NE: -7, PE: 21, strict: false, roundDown: 0, roundHalfUp: 1, roundHalfEven: 2, roundUp: 3, Big: [Circular], default: [Circular] }, padAndChop: [λ] }, logs: [ { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 84, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x000000000000000000000000000000000000000000000000000000000000074d' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 85, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x000000000000000000000000000000000000000000000000000000000000074e' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 86, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x000000000000000000000000000000000000000000000000000000000000074f' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 87, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000750' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 88, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000751' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 89, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000752' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 90, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000753' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 91, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000754' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 92, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000755' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 }, { address: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', blockHash: '0x03ddc6a835462f750fcaf5ab511d8c48121b0813e3e80de84d7adc3ef192b7bf', blockNumber: 14847842, data: '0x', logIndex: 93, topics: [ '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', '0x0000000000000000000000000000000000000000000000000000000000000000', '0x000000000000000000000000642824fab1d0141073ed74326332950bec4701e3', '0x0000000000000000000000000000000000000000000000000000000000000756' ], transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41 } ], logsBloom: '0x20000080004000000000000400000000000001000000000400000000000000000000000000000000000000000008000000000000000000000000000000004000000000000008000000000008000000010080000014000004000000000000000000100000020800000000000000001800000080000000002000000010000000000000000000000200000200000000002000000000000400000000000000000000000000000000000000000040000000000000000100000000000000000000040002100002000000000000080000000000000100000002000000040000001220000000000000000000000000000000000000000000000000000000000000004000', status: 1, to: '0x84F80EA01e26B7C11bdd241970982C7EEAb6DdcC', transactionHash: '0xd0befcb9d10a89aba2d488534811bf5c62a889e2499d23cdd83c2a2200cde873', transactionIndex: 41, type: 2, byzantium: true, confirmations: 40 }
 * ```
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
