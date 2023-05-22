import { splitSignature } from '../split-signature';

describe('splitSignature', () => {
  it('should match expected results', () => {
    const testCases = [
      { 
        signature: '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee331b', 
        expected: 
        {
          _vs: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33", 
          compact: "0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33", 
          r: "0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b39716", 
          recoveryParam: 0, 
          s: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33", 
          v: 27, 
          yParityAndS: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33"
        }
      },
      { 
        signature: '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33', 
        expected:
        {
          _vs: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33", 
          compact: "0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33", 
          r: "0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b39716",
          recoveryParam: 0,
          s: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33",
          v: 27,
          yParityAndS: "0x47252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33"
        }
      },
    ];

    testCases.forEach((testCase) => {
      expect(splitSignature(testCase.signature)).toStrictEqual(testCase.expected);
    });
  });

  it('should throw error on invalid signature', () => {
    const signature = '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee33238423849234765127';
    expect(() => {
      splitSignature(signature);
    }).toThrow('invalid signature string');
  });

  it('should throw error on invalid v byte', () => {
    const signature = '0x60bc4ed91f2021aefe7045f3f77bd12f87eb733aee24bd1965343b3c27b3971647252185b7d2abb411b01b5d1ac4ab41ea486df1e9b396758c1aec6c1b6eee3305';
    expect(() => {
      splitSignature(signature);
    }).toThrow('signature invalid v byte');
  });
});
