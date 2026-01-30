import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
      utils: 'src/utils/index-utils.ts',
    },
    format: ['esm'],
    dts: true,
    splitting: true,
    sourcemap: false,
    clean: true,
    outDir: 'dist',
    treeshake: true,
  },
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    dts: false,
    splitting: false,
    sourcemap: false,
    clean: false,
    outDir: 'dist',
  },
]);
