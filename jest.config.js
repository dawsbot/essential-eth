module.exports = {
  roots: ['<rootDir>/test', '<rootDir>/src'],
  testMatch: ['**/*.test.*'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globalSetup: '<rootDir>/test/global-setup',
  globalTeardown: '<rootDir>/test/global-teardown',
};
