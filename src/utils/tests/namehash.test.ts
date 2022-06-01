// @ts-ignore
import { hash as ethHash } from 'eth-ens-namehash';
import { namehash as eeHash } from '../..';

const names = [
  'faceboоk.eth',
  'facebook.eth',
  '\u017F\u0323\u0307.eth',
  '\u0073\u0323\u0307.eth',
];

describe('utils.namehash', () => {
  it('should match eth-ens-namehash', () => {
    names.forEach((name) => {
      const [eeNamehash, ethNamehash] = [eeHash(name), ethHash(name)];
      expect(eeNamehash).toBe(ethNamehash);
    });
  });
});
