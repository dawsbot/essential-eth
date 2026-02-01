'use strict';

const { RuleTester } = require('eslint');
const rule = require('../src/rules/no-heavy-imports');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

ruleTester.run('no-heavy-imports', rule, {
  valid: [
    // Importing from essential-eth is fine
    "import { formatUnits } from 'essential-eth';",
    // Importing from unrelated packages is fine
    "import { something } from 'lodash';",
    // Subpath imports from ethers don't trigger this rule (only top-level)
    "import { utils } from 'ethers/lib/utils';",
    // Subpath imports from viem don't trigger this rule
    "import { parseAbi } from 'viem/utils';",
    // Side-effect only imports (no specifiers)
    "import 'ethers';",
  ],

  invalid: [
    {
      code: "import { formatUnits } from 'ethers';",
      errors: [
        {
          messageId: 'noHeavyImports',
          data: {
            source: 'ethers',
            imports: 'formatUnits',
          },
        },
      ],
    },
    {
      code: "import { parseUnits, formatEther } from 'ethers';",
      errors: [
        {
          messageId: 'noHeavyImports',
          data: {
            source: 'ethers',
            imports: 'parseUnits, formatEther',
          },
        },
      ],
    },
    {
      code: "import { isAddress } from 'viem';",
      errors: [
        {
          messageId: 'noHeavyImports',
          data: {
            source: 'viem',
            imports: 'isAddress',
          },
        },
      ],
    },
    {
      code: "import ethers from 'ethers';",
      errors: [
        {
          messageId: 'noHeavyImports',
          data: {
            source: 'ethers',
            imports: '(entire library)',
          },
        },
      ],
    },
    {
      code: "import * as viem from 'viem';",
      errors: [
        {
          messageId: 'noHeavyImports',
          data: {
            source: 'viem',
            imports: '(entire library)',
          },
        },
      ],
    },
  ],
});

// RuleTester throws on failure, so if we get here all tests passed
test('no-heavy-imports rule passes all RuleTester cases', () => {
  expect(true).toBe(true);
});
