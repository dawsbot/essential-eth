export type ContractTypes =
  | 'bool'
  | 'bytes32'
  | 'bytes32[]'
  | 'address'
  | 'address payable'
  | 'address[4]'
  | 'address[100]'
  | 'uint256'
  | 'uint256[100]'
  | 'uint8'
  | 'uint32'
  | 'string';
export type ContractInterface = JSONABI;
export type ContractFunction<T = any> = (...args: Array<any>) => Promise<T>;
export type JSONABI = {
  anonymous?: false;
  inputs: {
    internalType?: ContractTypes | string;
    name: string;
    type: ContractTypes;
    indexed?: boolean;
  }[];
  name?: string;
  outputs?: {
    internalType?: ContractTypes | string;
    name: string;
    type: ContractTypes;
  }[];
  stateMutability?: 'view' | 'nonpayable' | string;
  type: 'function' | 'event' | 'constructor' | 'error';
  gas?: number;
}[];
