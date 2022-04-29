import { Keccak } from 'sha3';

export const keccak256 = (data: string) => {
  const keccak = new Keccak(256);
  const bufferableData = Buffer.from(data.replace(/^0x/, ''), 'hex');
  const addressHash = '0x' + keccak.update(bufferableData).digest('hex');
  return addressHash;
};
