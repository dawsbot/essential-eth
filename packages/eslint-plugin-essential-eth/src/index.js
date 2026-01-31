'use strict';

const preferEssentialEth = require('./rules/prefer-essential-eth');
const noHeavyImports = require('./rules/no-heavy-imports');

module.exports = {
  rules: {
    'prefer-essential-eth': preferEssentialEth,
    'no-heavy-imports': noHeavyImports,
  },
  configs: {
    recommended: {
      plugins: ['essential-eth'],
      rules: {
        'essential-eth/prefer-essential-eth': 'warn',
        'essential-eth/no-heavy-imports': 'warn',
      },
    },
  },
};
