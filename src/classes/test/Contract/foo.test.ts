import { describe, expect, it } from 'vitest';
import { encodeData } from '../../utils/encode-decode-transaction';
import type { JSONABIArgument } from './../../../types/Contract.types';
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
    const jsonABIArgument = fooABI.find(
      (abi) => abi.name === 'bar',
    ) as JSONABIArgument;
    const encoded = encodeData(jsonABIArgument, ['abc', 'def']);
    expect(encoded).toBe(
      '0xfce353f661626300000000000000000000000000000000000000000000000000000000006465660000000000000000000000000000000000000000000000000000000000',
    );
  });
});
