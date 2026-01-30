import { getAddress } from '../../index';

describe('getAddress', () => {
  it('checksums a lowercase address', () => {
    expect(getAddress('0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359')).toBe(
      '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
    );
  });

  it('returns already checksummed address unchanged', () => {
    expect(getAddress('0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359')).toBe(
      '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
    );
  });
});
