import { utils } from 'ethers';
import { splitSignature } from '../split-signature';

describe('splitSignature', () => {
  it('should match ethers.js', () => {
    const signatures = [
      '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee331b', //65 byte signature
      '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33', //64 byte signature
    ];

    signatures.forEach((signature) => {
      expect(splitSignature(signature)).toStrictEqual(
        utils.splitSignature(signature),
      );
    });
  });
});
