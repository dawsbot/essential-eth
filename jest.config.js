module.exports = {
  roots: ['<rootDir>/test', '<rootDir>/src'],
  testMatch: ['**/*.test.*'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./test/jest.setup-after-env.js'],
  // default is 10000
  testTimeout: 20000,
};
