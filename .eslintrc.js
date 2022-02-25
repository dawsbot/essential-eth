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
    'no-console': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'jest/prefer-expect-assertions': 'off',
    'jest/require-to-throw-message': 'off',
    'jest/expect-expect': 'off',
    'jest/lowercase-name': 'off',
    'jest/no-disabled-tests': 'warn',
    'jest/no-commented-out-tests': 'warn',
    'jest/require-hook': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
  },
};
