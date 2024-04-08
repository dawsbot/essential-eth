import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 15_000,
    setupFiles: 'dotenv/config', // load variables form .env file
  },
});
