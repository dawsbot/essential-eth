#!/usr/bin/env node
/**
 * 🪶 essential-eth migration tool
 *
 * Scans a codebase for viem imports and rewrites them to use essential-eth
 * where an equivalent utility exists.
 *
 * Usage:
 *   npx tsx scripts/migrate.ts <directory> [--dry-run]
 *
 * Examples:
 *   npx tsx scripts/migrate.ts ./src --dry-run   # preview changes
 *   npx tsx scripts/migrate.ts ./src              # apply changes
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Discover all exports from essential-eth so the map stays in sync
// automatically as new exports are added to the package.
// ---------------------------------------------------------------------------

function discoverEssentialEthExports(): Set<string> {
  const indexPath = path.resolve(__dirname, '..', 'src', 'index.ts');
  const content = fs.readFileSync(indexPath, 'utf-8');
  const names = new Set<string>();

  // Match named exports: export { Foo, Bar } from '...'
  const exportBlockRegex = /export\s*\{([^}]*)\}/g;
  let match: RegExpExecArray | null;
  while ((match = exportBlockRegex.exec(content)) !== null) {
    for (const token of match[1].split(',')) {
      // Handle `Foo as Bar` (take the exported name, i.e. the "as" part)
      const parts = token.trim().split(/\s+as\s+/);
      const name = (parts.length > 1 ? parts[1] : parts[0]).trim();
      if (name) names.add(name);
    }
  }

  return names;
}

const essentialEthExports = discoverEssentialEthExports();

// ---------------------------------------------------------------------------
// Migration map: viem export name → essential-eth export name
// ---------------------------------------------------------------------------

interface MigrationEntry {
  /** The essential-eth name for this symbol */
  name: string;
  /** Human-readable note shown in output (omitted when names are identical) */
  note?: string;
}

const MIGRATION_MAP: Record<string, MigrationEntry> = {
  // Conversions
  formatEther: {
    name: 'weiToEther',
    note: 'Renamed: formatEther → weiToEther',
  },
  parseEther: {
    name: 'etherToWei',
    note: 'Renamed: parseEther → etherToWei',
  },
  formatUnits: { name: 'formatUnits' },
  parseUnits: { name: 'parseUnits' },
  formatGwei: {
    name: 'gweiToEther',
    note: 'Renamed: formatGwei → gweiToEther',
  },
  parseGwei: {
    name: 'etherToGwei',
    note: 'Renamed: parseGwei → etherToGwei',
  },

  // Address
  getAddress: { name: 'getAddress' },
  isAddress: { name: 'isAddress' },

  // Hashing
  keccak256: { name: 'keccak256' },
  hashMessage: { name: 'hashMessage' },

  // Bytes
  toHex: { name: 'hexlify', note: 'Renamed: toHex → hexlify' },
  toBytes: { name: 'arrayify', note: 'Renamed: toBytes → arrayify' },
  concat: { name: 'concat' },
  pad: { name: 'zeroPad', note: 'Renamed: pad → zeroPad' },
  trim: { name: 'stripZeros', note: 'Renamed: trim → stripZeros' },
  isHex: { name: 'isHexString', note: 'Renamed: isHex → isHexString' },
  isBytes: { name: 'isBytes' },

  // ENS
  namehash: { name: 'namehash' },

  // Encoding
  encodePacked: { name: 'pack', note: 'Renamed: encodePacked → pack' },

  // ABI
  decodeFunctionResult: { name: 'decodeFunctionResult' },
  encodeFunctionData: { name: 'encodeFunctionData' },

  // Events
  decodeEventLog: { name: 'decodeEventLog' },
  toEventSignature: {
    name: 'getEventSignature',
    note: 'Renamed: toEventSignature → getEventSignature',
  },
  toEventHash: {
    name: 'getEventTopic',
    note: 'Renamed: toEventHash → getEventTopic',
  },

  // String / UTF-8
  stringToBytes: {
    name: 'toUtf8Bytes',
    note: 'Renamed: stringToBytes → toUtf8Bytes',
  },
  bytesToString: {
    name: 'toUtf8String',
    note: 'Renamed: bytesToString → toUtf8String',
  },

  // Hex utilities
  concatHex: {
    name: 'hexConcat',
    note: 'Renamed: concatHex → hexConcat',
  },
  slice: {
    name: 'hexDataSlice',
    note: 'Renamed: slice → hexDataSlice',
  },
  size: {
    name: 'hexDataLength',
    note: 'Renamed: size → hexDataLength',
  },
};

// Auto-add same-name entries for any essential-eth export that isn't already
// covered by the explicit map above. This means newly added exports (types,
// functions, etc.) are picked up automatically without touching this file.
for (const name of essentialEthExports) {
  // Check if this name is already a key (viem name) or a target (essential-eth name)
  const alreadyMapped =
    name in MIGRATION_MAP ||
    Object.values(MIGRATION_MAP).some((e) => e.name === name);
  if (!alreadyMapped) {
    MIGRATION_MAP[name] = { name };
  }
}

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

function printUsage(): void {
  console.log(`
🪶 essential-eth migration tool

Usage:
  npx tsx scripts/migrate.ts <directory> [--dry-run]

Options:
  --dry-run   Preview changes without writing files

Examples:
  npx tsx scripts/migrate.ts ./src --dry-run
  npx tsx scripts/migrate.ts ./src
`);
}

if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  printUsage();
  process.exit(0);
}

const dryRun = args.includes('--dry-run');
const targetDir = args.find((a) => !a.startsWith('--'));

if (!targetDir) {
  console.error('❌ No target directory provided.');
  printUsage();
  process.exit(1);
}

const resolvedDir = path.resolve(targetDir);

if (!fs.existsSync(resolvedDir)) {
  console.error(`❌ Directory not found: ${resolvedDir}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx']);

function findFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules and hidden dirs
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      results.push(...findFiles(full));
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Import parsing & rewriting
// ---------------------------------------------------------------------------

interface ParsedSymbol {
  /** The symbol name (without `type` keyword or alias) */
  name: string;
  /** Whether this symbol had an inline `type` keyword */
  isInlineType: boolean;
}

interface ParsedImport {
  /** Full matched text including the import statement */
  fullMatch: string;
  /** Individual imported symbols */
  symbols: ParsedSymbol[];
  /** The module specifier (e.g. 'viem', 'viem/chains') */
  source: string;
  /** Start index in file content */
  index: number;
  /** Whether this is a type-only import (`import type { ... }`) */
  isTypeImport: boolean;
}

/**
 * Find all import statements from viem (including subpath imports).
 * Handles:
 *   import { a, b } from 'viem'
 *   import type { a, b } from 'viem'
 *   import { a, b } from "viem"
 *   import { a, b } from 'viem/chains'
 *   Multi-line imports
 */
function findViemImports(content: string): ParsedImport[] {
  const results: ParsedImport[] = [];

  // Match import { ... } from 'viem...' or "viem..."
  // Also matches `import type { ... }` for type-only imports
  // The [\s\S]*? handles multi-line destructured imports
  const importRegex =
    /import\s+(type\s+)?\{([^}]*)\}\s*from\s*['"]((viem)(\/[^'"]*)?)['"]\s*;?/g;

  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(content)) !== null) {
    const isTypeImport = match[1] != null;
    const symbolsRaw = match[2];
    const source = match[3];

    // Parse symbols, handling:
    //   - aliases like "formatEther as fe"
    //   - inline type keywords like "type Address"
    const symbols: ParsedSymbol[] = symbolsRaw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => {
        // Detect and strip inline `type` keyword (e.g. `type Address` → `Address`)
        const isInlineType = /^type\s+/.test(s);
        const stripped = s.replace(/^type\s+/, '');
        // Extract the original name (before 'as')
        const parts = stripped.split(/\s+as\s+/);
        return { name: parts[0].trim(), isInlineType };
      });

    results.push({
      fullMatch: match[0],
      symbols,
      source,
      index: match.index,
      isTypeImport,
    });
  }

  return results;
}

interface FileResult {
  filePath: string;
  migrated: { viemName: string; essentialName: string; note?: string }[];
  unsupported: string[];
  modified: boolean;
}

/**
 * Process a single file: parse viem imports, rewrite what we can, track what
 * we can't.
 */
function processFile(filePath: string): FileResult {
  const result: FileResult = {
    filePath,
    migrated: [],
    unsupported: [],
    modified: false,
  };

  let content = fs.readFileSync(filePath, 'utf-8');
  const imports = findViemImports(content);

  if (imports.length === 0) return result;

  // Process imports in reverse order so string indices remain valid
  const sortedImports = [...imports].sort((a, b) => b.index - a.index);

  for (const imp of sortedImports) {
    const supported: ParsedSymbol[] = [];
    const unsupported: ParsedSymbol[] = [];

    for (const sym of imp.symbols) {
      if (MIGRATION_MAP[sym.name]) {
        supported.push(sym);
      } else {
        unsupported.push(sym);
      }
    }

    // Track unsupported
    for (const sym of unsupported) {
      result.unsupported.push(sym.name);
    }

    // Track migrated
    for (const sym of supported) {
      const entry = MIGRATION_MAP[sym.name];
      result.migrated.push({
        viemName: sym.name,
        essentialName: entry.name,
        note: entry.note,
      });
    }

    if (supported.length === 0) continue; // nothing to rewrite

    result.modified = true;

    // Build replacement import(s), preserving both `import type` and
    // inline `type` keywords (e.g. `import { type Address }`)
    const typePrefix = imp.isTypeImport ? 'type ' : '';

    function formatSymbol(sym: ParsedSymbol, mappedName: string): string {
      const inlineType = !imp.isTypeImport && sym.isInlineType ? 'type ' : '';
      return `${inlineType}${mappedName}`;
    }

    const essentialSymbols = supported.map((s) =>
      formatSymbol(s, MIGRATION_MAP[s.name].name),
    );
    const essentialImport = `import ${typePrefix}{ ${essentialSymbols.join(', ')} } from 'essential-eth';`;

    let replacement: string;
    if (unsupported.length === 0) {
      // All symbols migrated — replace entire import
      replacement = essentialImport;
    } else {
      // Split: keep viem import for unsupported, add essential-eth for supported
      const viemUnsupported = unsupported.map((s) => {
        const inlineType = !imp.isTypeImport && s.isInlineType ? 'type ' : '';
        return `${inlineType}${s.name}`;
      });
      const viemImport = `import ${typePrefix}{ ${viemUnsupported.join(', ')} } from '${imp.source}';`;
      replacement = `${essentialImport}\n${viemImport}`;
    }

    // Replace the import statement
    content =
      content.slice(0, imp.index) +
      replacement +
      content.slice(imp.index + imp.fullMatch.length);

    // Now find-and-replace all usages of renamed symbols in the file body.
    // We need to be careful to only replace the identifier, not substrings.
    // Use word-boundary matching.
    for (const sym of supported) {
      const entry = MIGRATION_MAP[sym.name];
      if (entry.name !== sym.name) {
        // Symbol was renamed — replace all usages
        // Match the symbol as a standalone identifier (not part of a larger word)
        const usageRegex = new RegExp(`\\b${sym.name}\\b`, 'g');
        // But skip the import line we just wrote — we'll do a two-pass approach:
        // since we already wrote the correct import, we replace in the rest of content.
        // Actually the import line uses the NEW name already, so replacing old→new
        // in the whole file is safe (the old name won't appear in the new import).
        content = content.replace(usageRegex, entry.name);
      }
    }
  }

  // Write back if modified and not dry-run
  if (result.modified && !dryRun) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log(`\n🪶 essential-eth migration tool${dryRun ? ' (dry run)' : ''}\n`);
console.log(`Scanning ${resolvedDir}...\n`);

const files = findFiles(resolvedDir);
const results: FileResult[] = [];

for (const file of files) {
  const result = processFile(file);
  // Only show files that had viem imports
  if (result.migrated.length > 0 || result.unsupported.length > 0) {
    results.push(result);
  }
}

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

let totalMigrated = 0;
let totalUnsupported = 0;
const unsupportedMap = new Map<string, string[]>(); // symbol → [files]

for (const r of results) {
  const relPath = path.relative(resolvedDir, r.filePath);
  const hasUnsupported = r.unsupported.length > 0;
  const hasMigrated = r.migrated.length > 0;

  const icon = hasUnsupported ? '⚠️ ' : '✅';
  console.log(`${icon} ${relPath}`);

  for (const m of r.migrated) {
    const desc =
      m.viemName === m.essentialName
        ? `${m.viemName} → ${m.essentialName} (same name)`
        : `${m.viemName} → ${m.essentialName}`;
    console.log(`   - ${desc}`);
    totalMigrated++;
  }

  for (const u of r.unsupported) {
    console.log(`   ⚠️  ${u} — not available in essential-eth`);
    totalUnsupported++;
    const existing = unsupportedMap.get(u) || [];
    existing.push(relPath);
    unsupportedMap.set(u, existing);
  }

  console.log();
}

// Summary
console.log('---');
console.log('📊 Summary:');
console.log(`   Files scanned: ${files.length}`);
console.log(`   Files with viem imports: ${results.length}`);
console.log(`   Imports migrated: ${totalMigrated}`);
console.log(`   Imports unsupported: ${totalUnsupported}`);

if (dryRun && totalMigrated > 0) {
  console.log(`\n   ℹ️  Dry run — no files were modified.`);
}

if (totalUnsupported > 0) {
  console.log(
    '\n❌ The following viem exports are not yet available in essential-eth:\n',
  );
  for (const [sym, usedIn] of unsupportedMap) {
    console.log(`   - ${sym} (used in: ${usedIn.join(', ')})`);
  }
  console.log(
    '\nThese need to be implemented before this codebase can fully migrate.',
  );
  console.log('Estimated bundle savings: ~300 kB (viem full → essential-eth)');
  process.exit(1);
} else if (totalMigrated > 0) {
  console.log('\n✅ All viem imports successfully migrated to essential-eth!');
  console.log('Estimated bundle savings: ~300 kB (viem full → essential-eth)');
} else {
  console.log('\nNo viem imports found. Nothing to migrate.');
}
