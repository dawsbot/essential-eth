module.exports = {
  roots: ['<rootDir>/test', '<rootDir>/src'],
  testMatch: ['**/*.test.*'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./test/jest.setup-after-env.js'],
};
