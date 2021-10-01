import { encodeData } from '../../utils/encode-decode-transaction';
import { fooABI } from './foo-abi';

describe('foo encode', () => {
  it('encodes "baz" function', () => {
    const encoded = encodeData(fooABI[0], [69, true]);
    expect(encoded).toBe(
      '0xcdcd77c000000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001',
    );
  });
});
