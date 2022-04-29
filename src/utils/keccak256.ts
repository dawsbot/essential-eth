import { Keccak } from 'sha3';
import { BytesLike } from './bytes';

export const keccak256 = (data: BytesLike) => {
  let bufferableData;
  if (typeof data === 'string') {
    bufferableData = Buffer.from(data.replace(/^0x/, ''), 'hex');
  } else {
    bufferableData = Buffer.from(data as any);
  }
  const keccak = new Keccak(256);
  const addressHash = '0x' + keccak.update(bufferableData).digest('hex');
  return addressHash;
};
