'use strict';

const { RuleTester } = require('eslint');
const rule = require('../src/rules/prefer-essential-eth');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

ruleTester.run('prefer-essential-eth', rule, {
  valid: [
    // Importing from essential-eth should be fine
    "import { formatUnits } from 'essential-eth';",
    // Importing unknown functions from ethers should be fine
    "import { Contract } from 'ethers';",
    // Importing from unrelated packages should be fine
    "import { something } from 'lodash';",
    // Default import from ethers (no named specifiers to check)
    "import ethers from 'ethers';",
  ],

  invalid: [
    {
      code: "import { formatUnits } from 'ethers';",
      errors: [
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'formatUnits',
            source: 'ethers',
            alternative: 'formatUnits',
          },
        },
      ],
    },
    {
      code: "import { parseUnits } from 'ethers';",
      errors: [
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'parseUnits',
            source: 'ethers',
            alternative: 'parseUnits',
          },
        },
      ],
    },
    {
      code: "import { formatEther } from 'ethers';",
      errors: [
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'formatEther',
            source: 'ethers',
            alternative: 'weiToEther',
          },
        },
      ],
    },
    {
      code: "import { parseEther } from 'ethers';",
      errors: [
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'parseEther',
            source: 'ethers',
            alternative: 'etherToWei',
          },
        },
      ],
    },
    {
      code: "import { getAddress, isAddress } from 'ethers';",
      errors: [
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'getAddress',
            source: 'ethers',
            alternative: 'getAddress',
          },
        },
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'isAddress',
            source: 'ethers',
            alternative: 'isAddress',
          },
        },
      ],
    },
    {
      code: "import { keccak256 } from 'viem';",
      errors: [
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'keccak256',
            source: 'viem',
            alternative: 'keccak256',
          },
        },
      ],
    },
    {
      code: "import { toUtf8Bytes, toUtf8String } from 'ethers';",
      errors: [
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'toUtf8Bytes',
            source: 'ethers',
            alternative: 'toUtf8Bytes',
          },
        },
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'toUtf8String',
            source: 'ethers',
            alternative: 'toUtf8String',
          },
        },
      ],
    },
    {
      code: "import { hexlify, isHexString } from 'ethers';",
      errors: [
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'hexlify',
            source: 'ethers',
            alternative: 'hexlify',
          },
        },
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'isHexString',
            source: 'ethers',
            alternative: 'isHexString',
          },
        },
      ],
    },
    // Subpath import from ethers
    {
      code: "import { formatUnits } from 'ethers/lib/utils';",
      errors: [
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'formatUnits',
            source: 'ethers/lib/utils',
            alternative: 'formatUnits',
          },
        },
      ],
    },
    // Import from viem subpath
    {
      code: "import { isAddress } from 'viem/utils';",
      errors: [
        {
          messageId: 'preferEssentialEth',
          data: {
            importName: 'isAddress',
            source: 'viem/utils',
            alternative: 'isAddress',
          },
        },
      ],
    },
  ],
});

// RuleTester throws on failure, so if we get here all tests passed
test('prefer-essential-eth rule passes all RuleTester cases', () => {
  expect(true).toBe(true);
});
