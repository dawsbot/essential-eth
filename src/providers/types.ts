import { BytesLike } from '../utils/bytes';

export interface TransactionRequest {
  to?: string;
  from?: string;
  data?: BytesLike;
  [key: string]: any;
  //   nonce?: BigNumberish;

  //   gasLimit?: BigNumberish;
  //   gasPrice?: BigNumberish;

  //   value?: BigNumberish;
  //   chainId?: number;

  //   type?: number;
  //   accessList?: AccessListish;

  //   maxPriorityFeePerGas?: BigNumberish;
  //   maxFeePerGas?: BigNumberish;

  //   customData?: Record<string, any>;
  //   ccipReadEnabled?: boolean;
}
