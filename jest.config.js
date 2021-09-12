module.exports = {
  roots: ["<rootDir>/test", "<rootDir>/src"],
  testMatch: ["**/*.test.*"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
