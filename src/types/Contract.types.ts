export type ContractTypes =
  | 'bool'
  | 'bytes1'
  | 'bytes2'
  | 'bytes3'
  | 'bytes4'
  | 'bytes5'
  | 'bytes6'
  | 'bytes7'
  | 'bytes8'
  | 'bytes9'
  | 'bytes10'
  | 'bytes11'
  | 'bytes12'
  | 'bytes13'
  | 'bytes14'
  | 'bytes15'
  | 'bytes16'
  | 'bytes17'
  | 'bytes18'
  | 'bytes19'
  | 'bytes20'
  | 'bytes21'
  | 'bytes22'
  | 'bytes23'
  | 'bytes24'
  | 'bytes25'
  | 'bytes26'
  | 'bytes27'
  | 'bytes28'
  | 'bytes29'
  | 'bytes30'
  | 'bytes31'
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
  | string;
export type ContractInterface = JSONABI;
export type ContractFunction<T = any> = (...args: Array<any>) => Promise<T>;
export interface JSONABIArgument {
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
  type: 'function' | 'event' | 'constructor' | 'error' | 'fallback';
  gas?: number;
  constant?: boolean;
  payable?: boolean;
}
export type JSONABI = JSONABIArgument[];
