import { computePublicKey } from '../../index';

describe('computePublicKey', () => {
  it('should compute correct public key', () => {
    const testCases = [
      {
        privateKey: '0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f',
        expectedPublicKey: '0x04d11e94912283d217fd98be5ad59c659aede69bbef0e72a2213edf0fbd8de3cc95030d006b137e22b89e738e5565766b83d12c438fe970e3e729532fcfafad2a7',
      },
      {
        privateKey: '0x38a3159d73cefd392d0176c29b3cc60ff43e81813f5ab5782571511df9bb16e2',
        expectedPublicKey: '0x04d8c5ec2308fdec8535411b8f7eb0251b53f53bcdda3f49bc7959a5dc1e12d2fe721bdd212b20fdbfa770c56af2da1bcf3b77dd46d742b65154c80aac7d44adf1',
      },
      {
        privateKey: '0xb6d36857e1f9b68e413d2496bb588f3650cdcc2398b3941963c44db8108b8671',
        expectedPublicKey: '0x04dab3b4d14577ec72a25c5b4dc7b404052263ccde860bff23b8e68efa215de0f119ed4540cd230d5c84d8a13a8c2105aefba78f342a423893489ae69c3c8a8cfb',
      },
      {
        privateKey: '0xf237d9763445d41150f9a199ad93ad478dff29ad8fe6fa00149ed12f40f8eb6f',
        expectedPublicKey: '0x042b9627d5b5e187bcc9e4155c65f986091f76e379a9fe031a7f9797ec74ad70d399e3655e20d3c6b6ca63ef691fe558c1794d78199b697f28697cf44e150dcfb1',
      },
    ];
    
    testCases.forEach((testCase) => {
      expect(computePublicKey(testCase.privateKey)).toBe(testCase.expectedPublicKey);
    });
  });
});
