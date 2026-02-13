/**
 * Checks that every runtime export from src/index.ts is mentioned
 * in skills/essential-eth-api/SKILL.md.
 *
 * Run: node scripts/lint-skill-docs.mjs
 */

import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const indexSrc = readFileSync(resolve(root, 'src/index.ts'), 'utf8');
const skillDoc = readFileSync(
  resolve(root, 'skills/essential-eth-api/SKILL.md'),
  'utf8',
);

// Exports from types/ are type-only and don't need skill docs
const TYPE_SOURCE_PATTERN = /\.\/types\//;

// Additional type-only exports from non-type files (interfaces, type aliases)
const TYPE_ONLY_EXPORTS = new Set([
  'Bytes',
  'BytesLike',
  'BytesLikeWithNumber',
  'DataOptions',
  'Hexable',
  'Signature',
  'SignatureLike',
  'ConstructorOptions',
]);

// Parse exports from index.ts
const exportBlocks = indexSrc.matchAll(
  /export\s*\{([^}]+)\}\s*from\s*'([^']+)'/g,
);

const missing = [];

for (const [, names, source] of exportBlocks) {
  // Skip type-only source files
  if (TYPE_SOURCE_PATTERN.test(source)) continue;

  const exportedNames = names
    .split(',')
    .map((n) => n.trim())
    .filter(Boolean);

  for (const name of exportedNames) {
    if (TYPE_ONLY_EXPORTS.has(name)) continue;
    if (!skillDoc.includes(name)) {
      missing.push({ name, source });
    }
  }
}

if (missing.length > 0) {
  console.error(
    'These exports from src/index.ts are missing from skills/essential-eth-api/SKILL.md:\n',
  );
  for (const { name, source } of missing) {
    console.error(`  - ${name} (from '${source}')`);
  }
  console.error(
    '\nAdd them to the skill doc or to TYPE_ONLY_EXPORTS in this script if they are type-only.',
  );
  process.exit(1);
} else {
  console.log('All runtime exports are documented in the skill.');
}
