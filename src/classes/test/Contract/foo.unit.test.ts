import { describe, expect, it } from 'vitest';
import type { JSONABIArgument } from '../../../types/Contract.types';
import { encodeData } from '../../utils/encode-decode-transaction';
import { fooABI } from './foo-abi';

describe('foo encode', () => {
  it('encodes "baz" function', () => {
    const jsonABIArgument = fooABI.find(
      (abi) => abi.name === 'baz',
    ) as JSONABIArgument;
    const encoded = encodeData(jsonABIArgument, [69, true]);

    expect(encoded).toBe(
      '0xcdcd77c000000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001',
    );
  });
  it('encodes "bar" function', () => {
    const args = [['0x010203', '0x040506']];
    const functionName = 'bar';
    const jsonABIArgument = fooABI.find(
      (abi) => abi.name === functionName,
    ) as JSONABIArgument;

    // const iface = new Interface(fooABI as any);
    // const ethersEncoded = iface.encodeFunctionData(functionName, args);
    expect(() => encodeData(jsonABIArgument, args)).toThrow();
  });
});
