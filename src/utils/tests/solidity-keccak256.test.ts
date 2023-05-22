import { solidityKeccak256 } from '../../index';

/**
 *
 * @param inputs
 */
function testSolidityKeccak256(inputs: Array<any>) {
  inputs.forEach((input) => {
    expect(solidityKeccak256(input.types, input.values)).toBe(
      input.expected,
    );
  });
}

describe('solidityKeccak256', () => {
  it('should match expected hash - addresses', () => {
    const inputs = [
      {
        types: ['address'],
        values: ['0x4d7F1790644Af787933c9fF0e2cff9a9B4299Abb'],
        expected: '0x72fe4a1287bb827ec8d04e045f7559955a8e694063af513008f111670674178a',
      },
      {
        types: ['address', 'address'],
        values: [
          '0xB5503a7db1A9105cd459D99153e69a76a8EF1530',
          '0xaa0fc255b079e775f9307e5cfec472a555cebc3a',
        ],
        expected: '0x36020dd625e805ec80eb7c7e36e5b69108500af4bb4913245a3d643d33466581',
      },
    ];
    testSolidityKeccak256(inputs);
  });
  
  it('should match expected hash - strings', () => {
    const inputs = [
      { types: ['string'],
        values: ['essential-eth'],
        expected: '0xd5b027dc2bddae7475604f19ca210363f0a3c63a32d79c2fff540b9c21249f2c' 
      },
      { types: ['string', 'string'],
        values: ['firstText', 'secondString'], 
        expected: '0xf9b3d91668a0f53719a929eb38ac29b07896b3a33ef806cfbe5033bb5ce1e58b' 
      },
      {
        types: ['string', 'string', 'string'],
        values: ['example1', '2934823', 'true'],
        expected: '0x731e3313bb527075d72c8a724eea170cdc200edf65c958d3014f666faf9a4d41',
      },
    ];
    testSolidityKeccak256(inputs);
  });

  it('should match expected hash for bytes (dynamic size) & BytesLike', () => {
    const inputs = [
      { 
        types: ['bytes'], 
        values: [[115, 101, 99, 114, 101, 116]], 
        expected: '0x65462b0520ef7d3df61b9992ed3bea0c56ead753be7c8b3614e0ce01e4cac41b'
      },
      { 
        types: ['bytes'], 
        values: ['0x62797465734c696b65'], // BytesLike string
        expected: '0x89ddb668afdb92cd9027c2ecf8ef3f36f2a76d07f72db32f17be6ddd5552abfb' 
      },
      {
        types: ['bytes', 'bytes'],
        values: [
          '0x657373656e7469616c2d657468',
          [115, 109, 97, 108, 108, 101, 115, 116],
        ],
        expected: '0xb57d179e947e0bfe9813227c428eeea3558dc20e47a9fe64b9d9f29b9b5eeff0'
      },
    ];
    testSolidityKeccak256(inputs);
  });
  it('should match expected hash for bytes (static size)', () => {
    const inputs = [
      { 
        types: ['bytes4'], 
        values: [[116, 101, 115, 116]], 
        expected: '0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658' 
      },
      {
        types: ['bytes13', 'bytes1', 'bytes2', 'bytes5', 'bytes1'],
        values: [
          [101, 115, 115, 101, 110, 116, 105, 97, 108, 45, 101, 116, 104],
          [32],
          [105, 115],
          [103, 114, 101, 97, 116],
          [33],
        ],
        expected: '0xe44f351d6a5adfe8e8917ee07b7269e9fb019a97fba5eeab82899b02e3f15d1f'
      },
    ];
    testSolidityKeccak256(inputs);
  });
  it('should match expected hash for booleans (specified as type "bool" to match solidity)', () => {
    const inputs = [
      { 
        types: ['bool'], 
        values: [true], 
        expected: '0x5fe7f977e71dba2ea1a68e21057beebb9be2ac30c6410aa38d4f3fbe41dcffd2' 
      },
      { 
        types: ['bool', 'bool'], 
        values: [false, false],
        expected: '0x54a8c0ab653c15bfb48b47fd011ba2b9617af01cb45cab344acd57c924d56798'
      },
    ];
    testSolidityKeccak256(inputs);
  });
  it('should match expected hash for (signed and unsigned) integers', () => {
    const inputs = [
      { 
        types: ['int16'], 
        values: [-1], 
        expected: '0x06d41322d79dfed27126569cb9a80eb0967335bf2f3316359d2a93c779fcd38a' 
      },
      { 
        types: ['uint48'], 
        values: [12], 
        expected: '0x505be1cd98680abcc2473d7336b83f86f30185d233a18e7dbf9a0add7f7fb583' 
      },
      { 
        types: ['int16', 'uint48'], 
        values: [-1, 12], 
        expected: '0x81da7abb5c9c7515f57dab2fc946f01217ab52f3bd8958bc36bd55894451a93c' 
      },
    ];
    testSolidityKeccak256(inputs);
  });
  // it('should match ethers.js array parsing', () => {
  //   const inputs = [
  //     { types: ['string[2]'], values: [['some-text', 'additional-text']] },
  //     // Test case currently broken - see https://github.com/Earnifi/essential-eth/pull/77#pullrequestreview-948182796
  //     // Will be re-enabled upon bug fix
  //     {
  //       types: ['uint48[3]', 'bool[2]', 'address[2]', 'bytes1[1]'],
  //       values: [
  //         [2, 5, 8],
  //         [true, false],
  //         [
  //           '0xB5503a7db1A9105cd459D99153e69a76a8EF1530',
  //           '0xaa0fc255b079e775f9307e5cfec472a555cebc3a',
  //         ],
  //         [[15]],
  //       ],
  //     },
  //   ];
  //   testSolidityKeccak256(inputs);
  // });
  it('should match expected hash when passing different types into the same solidityKeccak256 function call', () => {
    const inputs = [
      {
        types: ['int16', 'string', 'bool'],
        values: [-5, 'essential-eth', true],
        expected: '0xa7bbaa8154fe7d3d9a9d813fa435b386fd75dc57d02b620baafc04074658c454'
      },
      {
        types: ['address', 'uint48', 'bytes4'],
        values: [
          '0xB5503a7db1A9105cd459D99153e69a76a8EF1530',
          20,
          [116, 101, 115, 116],
        ],
        expected: '0x6e4e133a4879decc8bf952c54092cb965ba979f38d5e6fb62d47e6bdd7ea390c'
      },
      {
        types: ['string[3]', 'bytes', 'bool[2]'],
        values: [
          ['ethereum', 'blockchain', '204'],
          [115, 111, 108, 105, 100, 105, 116, 121],
          [false, true],
        ],
        expected: '0xb66a5a976e76e7f2d8b2d5baff670f9937c12b6c3484a9479075d9ecfc2700d2'
      },
    ];
    testSolidityKeccak256(inputs);
  });
});