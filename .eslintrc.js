module.exports = {
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
    'no-console': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'jest/prefer-expect-assertions': 'off',
    'jest/require-to-throw-message': 'off',
  },
};
