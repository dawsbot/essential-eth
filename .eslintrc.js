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
        'jsdoc/require-param-type': 'off', // TypeDoc automatically reads types from TypeScript types, hence param types should rarely be defined explictly -- https://typedoc.org/guides/doccomments/#%40param-%3Cparam-name%3E
        'jsdoc/require-returns-type': 'off', // Read above note for `jsdoc/require-param-type`
        // 'jsdoc/check-examples': 'warn', // Ensures examples match a certain format -- currently not supported for ESLint, waiting for this issue -- https://github.com/eslint/eslint/issues/14745
        'jsdoc/check-indentation': 'warn', // Ensures proper indentation of items inside TypeDoc comments
        'jsdoc/check-line-alignment': 'warn', // Ensures TypeDoc comments are aligned to match what it's documenting
        'jsdoc/check-syntax': 'warn', // Ensures that documentation syntax is appropriate for Google Closure Compiler
        'jsdoc/require-asterisk-prefix': 'warn', // Require that all documentation is prefixed with an asterisk, makes it easier to differentiate what's documentation and what isn't
        'jsdoc/require-example': 'warn', // Ensures that all documentated functions have examples
        'jsdoc/require-hyphen-before-param-description': ['warn', 'never'], // Prevent hyphens before description of a parameter
      },
    },
  ],
};
