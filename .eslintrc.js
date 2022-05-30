module.exports = {
  ignorePatterns: ['scripts/calculate-bundle-size.js', 'test/*.js'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/all',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'no-empty': 'warn',
    'no-console': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'jest/expect-expect': 'off',
    'jest/lowercase-name': 'off',
    'jest/no-commented-out-tests': 'off',
    'jest/no-conditional-expect': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/prefer-expect-assertions': 'off',
    'jest/require-hook': 'off',
    'jest/require-to-throw-message': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  },
  overrides: [
    {
      files: 'src/**/*.ts',
      excludedFiles: '*.test.ts',
      plugins: ['jsdoc'],
      extends: ['plugin:jsdoc/recommended'],
      rules: {
        // 'jsdoc/check-examples': 'warn', // Ensures examples match a certain format -- currently not supported for ESLint, waiting for this issue -- https://github.com/eslint/eslint/issues/14745
        'jsdoc/check-indentation': 'warn', // Ensures proper indentation of items inside TypeDoc comments
        'jsdoc/check-line-alignment': 'warn', // Ensures TypeDoc comments are aligned to match what it's documenting
        'jsdoc/check-syntax': 'warn', // Ensures that documentation syntax is appropriate for Google Closure Compiler
        'jsdoc/check-tag-names': ['warn', { definedTags: ['alpha', 'beta'] }], // Should check that tag names are valid; include 'alpha' and 'beta' as acceptable tag names
        'jsdoc/no-multi-asterisks': ['warn', { allowWhitespace: true }],
        'jsdoc/require-asterisk-prefix': 'warn', // Require that all documentation is prefixed with an asterisk, makes it easier to differentiate what's documentation and what isn't
        'jsdoc/require-description': ['warn'],
        'jsdoc/require-example': 'warn', // Ensures that all documentated functions have examples
        'jsdoc/require-hyphen-before-param-description': ['warn', 'never'], // Prevent hyphens before description of a parameter
        'jsdoc/require-param-type': 'off', // TypeDoc automatically reads types from TypeScript types, hence param types should rarely be defined explictly -- https://typedoc.org/guides/doccomments/#%40param-%3Cparam-name%3E
        'jsdoc/require-returns': [
          'warn',
          { checkGetters: true, forceReturnsWithAsync: true },
        ],
        'jsdoc/require-returns-type': 'off', // Read above note for `jsdoc/require-param-type`
      },
    },
    {
      files: 'src/providers/BaseProvider.ts',
      rules: {
        'jsdoc/match-description': [
          'warn',
          {
            message: `Description formatting error. The description should match this formatting:
            /**
             * Returns transaction receipt event logs that match a specified filter.
             *
             * * [Identical](/docs/api#isd) to [ethers.provider.getLogs](https://docs.ethers.io/v5/api/providers/provider/#Provider-getLogs) in ethers.js
             * * [Identical](/docs/api#isd) to [web3.eth.getPastLogs](https://web3js.readthedocs.io/en/v1.7.3/web3-eth.html#getpastlogs) in web3.js
             
            In other words...
            * needs text description line explaining what function does. Starts with capital letter, ends with period
            * line break
            * needs two lines comparing to ethers and web3. Lines need to start with links that have the text Identical, Similar, or Dissimilar that link to /docs/api#isd
            * Comparing lines need to have links to ethers or web3, and end with either "in ethers.js" or "in web3.js"
            `,
            matchDescription:
              '(?:[A-Z].*\\.\\n{0,2}?)+\\n\\n(?:(?:\\* \\[(?:Identical|Similar|Dissimilar)\\]\\(\\/docs\\/api#isd\\)) to (?:\\[.*\\])(?:\\(.*\\)) in (?:ethers|web3).js\\n{0,1}){2}',
            //  https://regex101.com/r/39MoEb/1
          },
        ],
      },
    },
  ],
};
