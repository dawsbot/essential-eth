#!/usr/bin/env bash
# scripts/update-bundle-sizes.sh
#
# Measures ESM bundle sizes (minified) for essential-eth, ethers, and viem,
# then updates the comparison table in readme.md between the sentinel comments:
#   <!-- BUNDLE-SIZE-TABLE:START -->
#   <!-- BUNDLE-SIZE-TABLE:END -->
#
# Usage: bash scripts/update-bundle-sizes.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

# ─── 1. Ensure essential-eth is built ───────────────────────────────────────
echo "→ Building essential-eth..."
(cd "$ROOT" && npx tsup --silent 2>/dev/null || npx tsup)

# ─── 2. Set up a temp workspace with ethers + viem ──────────────────────────
echo "→ Installing comparison libraries in temp dir..."
cat > "$WORK/package.json" <<'EOF'
{ "private": true, "type": "module" }
EOF
(cd "$WORK" && npm install --save ethers@6 viem esbuild 2>/dev/null)

# Grab installed versions
ETHERS_VER=$(node -e "console.log(require('$WORK/node_modules/ethers/package.json').version)")
VIEM_VER=$(node -e "console.log(require('$WORK/node_modules/viem/package.json').version)")
EETH_VER=$(node -e "console.log(require('$ROOT/package.json').version)")

echo "   essential-eth@$EETH_VER  ethers@$ETHERS_VER  viem@$VIEM_VER"

ESBUILD="$WORK/node_modules/.bin/esbuild"

# ─── 3. Define entry-point files ────────────────────────────────────────────

# --- essential-eth ---
echo "export * from '$ROOT/dist/index.js';" > "$WORK/ee-full.js"
echo "export { JsonRpcProvider, FallthroughProvider } from '$ROOT/dist/index.js';" > "$WORK/ee-provider.js"
echo "export { Contract } from '$ROOT/dist/index.js';" > "$WORK/ee-contract.js"

# --- ethers ---
echo "export * from 'ethers';" > "$WORK/ethers-full.js"
echo "export { JsonRpcProvider } from 'ethers';" > "$WORK/ethers-provider.js"
echo "export { Contract } from 'ethers';" > "$WORK/ethers-contract.js"

# --- viem ---
echo "export * from 'viem';" > "$WORK/viem-full.js"
echo "export { createPublicClient, http } from 'viem';" > "$WORK/viem-provider.js"
echo "export { getContract } from 'viem';" > "$WORK/viem-contract.js"

# ─── 4. Bundle & measure ────────────────────────────────────────────────────
measure() {
  local entry="$1" outfile="$2"
  "$ESBUILD" "$entry" --bundle --format=esm --minify --outfile="$outfile" \
    --platform=browser --target=es2020 2>/dev/null
  wc -c < "$outfile" | tr -d ' '
}

echo "→ Measuring bundle sizes..."

EE_FULL=$(measure "$WORK/ee-full.js" "$WORK/out-ee-full.js")
ETH_FULL=$(measure "$WORK/ethers-full.js" "$WORK/out-eth-full.js")
VIEM_FULL=$(measure "$WORK/viem-full.js" "$WORK/out-viem-full.js")

EE_PROV=$(measure "$WORK/ee-provider.js" "$WORK/out-ee-prov.js")
ETH_PROV=$(measure "$WORK/ethers-provider.js" "$WORK/out-eth-prov.js")
VIEM_PROV=$(measure "$WORK/viem-provider.js" "$WORK/out-viem-prov.js")

EE_CONT=$(measure "$WORK/ee-contract.js" "$WORK/out-ee-cont.js")
ETH_CONT=$(measure "$WORK/ethers-contract.js" "$WORK/out-eth-cont.js")
VIEM_CONT=$(measure "$WORK/viem-contract.js" "$WORK/out-viem-cont.js")

# ─── 5. Format helpers ──────────────────────────────────────────────────────
fmt_kb() {
  echo "$1" | awk '{ printf "%.1f kB", $1 / 1000 }'
}

# Format a cell: bold + trophy if smallest, plain otherwise
# Args: bytes_this bytes_a bytes_b
fmt_cell() {
  local this="$1" a="$2" b="$3"
  local kb
  kb=$(fmt_kb "$this")
  if [ "$this" -le "$a" ] && [ "$this" -le "$b" ]; then
    echo "**$kb** 🏆"
  else
    echo "$kb"
  fi
}

C_EE_FULL=$(fmt_cell "$EE_FULL" "$ETH_FULL" "$VIEM_FULL")
C_ETH_FULL=$(fmt_cell "$ETH_FULL" "$EE_FULL" "$VIEM_FULL")
C_VIEM_FULL=$(fmt_cell "$VIEM_FULL" "$EE_FULL" "$ETH_FULL")

C_EE_PROV=$(fmt_cell "$EE_PROV" "$ETH_PROV" "$VIEM_PROV")
C_ETH_PROV=$(fmt_cell "$ETH_PROV" "$EE_PROV" "$VIEM_PROV")
C_VIEM_PROV=$(fmt_cell "$VIEM_PROV" "$EE_PROV" "$ETH_PROV")

C_EE_CONT=$(fmt_cell "$EE_CONT" "$ETH_CONT" "$VIEM_CONT")
C_ETH_CONT=$(fmt_cell "$ETH_CONT" "$EE_CONT" "$VIEM_CONT")
C_VIEM_CONT=$(fmt_cell "$VIEM_CONT" "$EE_CONT" "$ETH_CONT")

# Compute ratio for full library (essential-eth vs the smaller of ethers/viem)
SMALLER_FULL=$(echo "$ETH_FULL $VIEM_FULL" | awk '{ print ($1 < $2) ? $1 : $2 }')
RATIO=$(echo "$SMALLER_FULL $EE_FULL" | awk '{ printf "%d", $1 / $2 }')

# ─── 6. Write the table to a temp file ──────────────────────────────────────
TABLE_FILE="$WORK/table.md"
cat > "$TABLE_FILE" <<EOF
### Bundle Size Comparison (ESM, minified)

Measured with esbuild. Smaller is better.

| What you import                          | essential-eth@$EETH_VER | ethers@$ETHERS_VER | viem@$VIEM_VER |
| ---------------------------------------- | :---------------------: | :----------------: | :------------: |
| **Full library**                         | $C_EE_FULL | $C_ETH_FULL | $C_VIEM_FULL |
| **Provider** (getBalance, getBlock, etc) | $C_EE_PROV | $C_ETH_PROV | $C_VIEM_PROV |
| **Contract** (read-only calls)           | $C_EE_CONT | $C_ETH_CONT | $C_VIEM_CONT |

essential-eth is **${RATIO}x smaller** than ethers and viem for full-library usage.
EOF

# ─── 7. Replace in readme.md ────────────────────────────────────────────────
README="$ROOT/readme.md"

if ! grep -q '<!-- BUNDLE-SIZE-TABLE:START -->' "$README"; then
  echo "ERROR: Missing <!-- BUNDLE-SIZE-TABLE:START --> comment in readme.md"
  exit 1
fi
if ! grep -q '<!-- BUNDLE-SIZE-TABLE:END -->' "$README"; then
  echo "ERROR: Missing <!-- BUNDLE-SIZE-TABLE:END --> comment in readme.md"
  exit 1
fi

# Build the new readme:
#   1. Everything up to and including START comment
#   2. Blank line + table content + blank line
#   3. Everything from END comment onward
{
  sed -n '1,/<!-- BUNDLE-SIZE-TABLE:START -->/p' "$README"
  echo ""
  cat "$TABLE_FILE"
  echo ""
  sed -n '/<!-- BUNDLE-SIZE-TABLE:END -->/,$p' "$README"
} > "$README.tmp"

mv "$README.tmp" "$README"

echo "✅ Bundle size table updated in readme.md"
echo ""
cat "$TABLE_FILE"
npx prettier --write readme.md
