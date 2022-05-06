import { utils } from 'ethers';
import { recoverAddress } from '../../index';
describe('recoverAddress', () => {
  it('should match ethers.js', () => {
    const digest =
      '0x49204c4f5645205448452053454154544c45204e4654204d555345554d';
    const signature =
      '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee331b';
    expect(recoverAddress(digest, signature)).toBe(
      utils.recoverAddress(digest, signature),
    );
  });
});
