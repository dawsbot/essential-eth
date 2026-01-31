#!/usr/bin/env bash
# scripts/update-bundle-sizes.sh
#
# Measures ESM bundle sizes (minified) for essential-eth, ethers, viem, web3, and ox,
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

# ─── 2. Set up a temp workspace with comparison libraries ────────────────────
echo "→ Installing comparison libraries in temp dir..."
cat > "$WORK/package.json" <<'EOF'
{ "private": true, "type": "module" }
EOF
(cd "$WORK" && bun install ethers@6 viem web3 ox esbuild 2>/dev/null)

# Grab installed versions
ETHERS_VER=$(node -e "console.log(require('$WORK/node_modules/ethers/package.json').version)")
VIEM_VER=$(node -e "console.log(require('$WORK/node_modules/viem/package.json').version)")
WEB3_VER=$(node -e "console.log(require('$WORK/node_modules/web3/package.json').version)")
OX_VER=$(node -e "console.log(require('$WORK/node_modules/ox/package.json').version)")
EETH_VER=$(node -e "console.log(require('$ROOT/package.json').version)")

echo "   essential-eth@$EETH_VER  ethers@$ETHERS_VER  viem@$VIEM_VER  web3@$WEB3_VER  ox@$OX_VER"

ESBUILD="$WORK/node_modules/.bin/esbuild"

# ─── 3. Define entry-point files ────────────────────────────────────────────

# --- essential-eth ---
echo "export * from '$ROOT/dist/index.js';" > "$WORK/ee-full.js"
echo "export { JsonRpcProvider, FallthroughProvider } from '$ROOT/dist/index.js';" > "$WORK/ee-provider.js"
echo "export { Contract } from '$ROOT/dist/index.js';" > "$WORK/ee-contract.js"
echo "export { weiToEther, etherToWei, etherToGwei, gweiToEther } from '$ROOT/dist/conversions.js';" > "$WORK/ee-conversion.js"

# --- ethers ---
echo "export * from 'ethers';" > "$WORK/ethers-full.js"
echo "export { JsonRpcProvider } from 'ethers';" > "$WORK/ethers-provider.js"
echo "export { Contract } from 'ethers';" > "$WORK/ethers-contract.js"
echo "export { formatEther, parseEther, formatUnits, parseUnits } from 'ethers';" > "$WORK/ethers-conversion.js"

# --- viem ---
echo "export * from 'viem';" > "$WORK/viem-full.js"
echo "export { createPublicClient, http } from 'viem';" > "$WORK/viem-provider.js"
echo "export { getContract } from 'viem';" > "$WORK/viem-contract.js"
echo "export { formatEther, parseEther, formatGwei, parseGwei } from 'viem';" > "$WORK/viem-conversion.js"

# --- web3 ---
echo "export * from 'web3';" > "$WORK/web3-full.js"
echo "import Web3 from 'web3'; const w = new Web3(); export { w };" > "$WORK/web3-provider.js"
echo "import { Contract } from 'web3-eth-contract'; export { Contract };" > "$WORK/web3-contract.js"
echo "import Web3 from 'web3'; export const { utils } = Web3;" > "$WORK/web3-conversion.js"

# --- ox ---
echo "export * from 'ox';" > "$WORK/ox-full.js"
echo "export { RpcTransport } from 'ox';" > "$WORK/ox-provider.js"
echo "export { Abi, AbiFunction } from 'ox';" > "$WORK/ox-contract.js"
echo "export { Value } from 'ox';" > "$WORK/ox-conversion.js"

# ─── 4. Bundle & measure ────────────────────────────────────────────────────
measure() {
  local entry="$1" outfile="$2"
  if "$ESBUILD" "$entry" --bundle --format=esm --minify --outfile="$outfile" \
    --platform=browser --target=es2020 2>/dev/null; then
    wc -c < "$outfile" | tr -d ' '
  else
    echo "0"
  fi
}

echo "→ Measuring bundle sizes (parallel)..."

# Run all esbuild bundles in parallel, writing byte counts to result files
measure_async() {
  local entry="$1" outfile="$2" resultfile="$3"
  measure "$entry" "$outfile" > "$resultfile" &
}

measure_async "$WORK/ee-full.js"          "$WORK/out-ee-full.js"     "$WORK/r-ee-full"
measure_async "$WORK/ethers-full.js"      "$WORK/out-eth-full.js"    "$WORK/r-eth-full"
measure_async "$WORK/viem-full.js"        "$WORK/out-viem-full.js"   "$WORK/r-viem-full"
measure_async "$WORK/web3-full.js"        "$WORK/out-web3-full.js"   "$WORK/r-web3-full"
measure_async "$WORK/ox-full.js"          "$WORK/out-ox-full.js"     "$WORK/r-ox-full"

measure_async "$WORK/ee-provider.js"      "$WORK/out-ee-prov.js"     "$WORK/r-ee-prov"
measure_async "$WORK/ethers-provider.js"  "$WORK/out-eth-prov.js"    "$WORK/r-eth-prov"
measure_async "$WORK/viem-provider.js"    "$WORK/out-viem-prov.js"   "$WORK/r-viem-prov"
measure_async "$WORK/web3-provider.js"    "$WORK/out-web3-prov.js"   "$WORK/r-web3-prov"
measure_async "$WORK/ox-provider.js"      "$WORK/out-ox-prov.js"     "$WORK/r-ox-prov"

measure_async "$WORK/ee-contract.js"      "$WORK/out-ee-cont.js"     "$WORK/r-ee-cont"
measure_async "$WORK/ethers-contract.js"  "$WORK/out-eth-cont.js"    "$WORK/r-eth-cont"
measure_async "$WORK/viem-contract.js"    "$WORK/out-viem-cont.js"   "$WORK/r-viem-cont"
measure_async "$WORK/web3-contract.js"    "$WORK/out-web3-cont.js"   "$WORK/r-web3-cont"
measure_async "$WORK/ox-contract.js"      "$WORK/out-ox-cont.js"     "$WORK/r-ox-cont"

measure_async "$WORK/ee-conversion.js"    "$WORK/out-ee-conv.js"     "$WORK/r-ee-conv"
measure_async "$WORK/ethers-conversion.js" "$WORK/out-eth-conv.js"   "$WORK/r-eth-conv"
measure_async "$WORK/viem-conversion.js"  "$WORK/out-viem-conv.js"   "$WORK/r-viem-conv"
measure_async "$WORK/web3-conversion.js"  "$WORK/out-web3-conv.js"   "$WORK/r-web3-conv"
measure_async "$WORK/ox-conversion.js"    "$WORK/out-ox-conv.js"     "$WORK/r-ox-conv"

wait

# Read results
EE_FULL=$(cat "$WORK/r-ee-full")
ETH_FULL=$(cat "$WORK/r-eth-full")
VIEM_FULL=$(cat "$WORK/r-viem-full")
WEB3_FULL=$(cat "$WORK/r-web3-full")
OX_FULL=$(cat "$WORK/r-ox-full")

EE_PROV=$(cat "$WORK/r-ee-prov")
ETH_PROV=$(cat "$WORK/r-eth-prov")
VIEM_PROV=$(cat "$WORK/r-viem-prov")
WEB3_PROV=$(cat "$WORK/r-web3-prov")
OX_PROV=$(cat "$WORK/r-ox-prov")

EE_CONT=$(cat "$WORK/r-ee-cont")
ETH_CONT=$(cat "$WORK/r-eth-cont")
VIEM_CONT=$(cat "$WORK/r-viem-cont")
WEB3_CONT=$(cat "$WORK/r-web3-cont")
OX_CONT=$(cat "$WORK/r-ox-cont")

EE_CONV=$(cat "$WORK/r-ee-conv")
ETH_CONV=$(cat "$WORK/r-eth-conv")
VIEM_CONV=$(cat "$WORK/r-viem-conv")
WEB3_CONV=$(cat "$WORK/r-web3-conv")
OX_CONV=$(cat "$WORK/r-ox-conv")

# ─── 5. Format helpers ──────────────────────────────────────────────────────
fmt_kb() {
  echo "$1" | awk '{ printf "%.1f kB", $1 / 1000 }'
}

# Format a cell: bold + trophy if smallest among all values, plain otherwise
# Args: bytes_this bytes_all...
# A value of 0 means the build failed — show N/A
fmt_cell() {
  local this="$1"; shift
  if [ "$this" -eq 0 ]; then
    echo "N/A"
    return
  fi
  local kb min
  kb=$(fmt_kb "$this")
  min="$this"
  for v in "$@"; do
    if [ "$v" -gt 0 ] && [ "$v" -lt "$min" ]; then min="$v"; fi
  done
  if [ "$this" -le "$min" ]; then
    echo "**$kb** 🏆"
  else
    echo "$kb"
  fi
}

# Full library
ALL_FULL="$EE_FULL $ETH_FULL $VIEM_FULL $WEB3_FULL $OX_FULL"
C_EE_FULL=$(fmt_cell "$EE_FULL" $ALL_FULL)
C_ETH_FULL=$(fmt_cell "$ETH_FULL" $ALL_FULL)
C_VIEM_FULL=$(fmt_cell "$VIEM_FULL" $ALL_FULL)
C_WEB3_FULL=$(fmt_cell "$WEB3_FULL" $ALL_FULL)
C_OX_FULL=$(fmt_cell "$OX_FULL" $ALL_FULL)

# Provider
ALL_PROV="$EE_PROV $ETH_PROV $VIEM_PROV $WEB3_PROV $OX_PROV"
C_EE_PROV=$(fmt_cell "$EE_PROV" $ALL_PROV)
C_ETH_PROV=$(fmt_cell "$ETH_PROV" $ALL_PROV)
C_VIEM_PROV=$(fmt_cell "$VIEM_PROV" $ALL_PROV)
C_WEB3_PROV=$(fmt_cell "$WEB3_PROV" $ALL_PROV)
C_OX_PROV=$(fmt_cell "$OX_PROV" $ALL_PROV)

# Contract
ALL_CONT="$EE_CONT $ETH_CONT $VIEM_CONT $WEB3_CONT $OX_CONT"
C_EE_CONT=$(fmt_cell "$EE_CONT" $ALL_CONT)
C_ETH_CONT=$(fmt_cell "$ETH_CONT" $ALL_CONT)
C_VIEM_CONT=$(fmt_cell "$VIEM_CONT" $ALL_CONT)
C_WEB3_CONT=$(fmt_cell "$WEB3_CONT" $ALL_CONT)
C_OX_CONT=$(fmt_cell "$OX_CONT" $ALL_CONT)

# Conversions
ALL_CONV="$EE_CONV $ETH_CONV $VIEM_CONV $WEB3_CONV $OX_CONV"
C_EE_CONV=$(fmt_cell "$EE_CONV" $ALL_CONV)
C_ETH_CONV=$(fmt_cell "$ETH_CONV" $ALL_CONV)
C_VIEM_CONV=$(fmt_cell "$VIEM_CONV" $ALL_CONV)
C_WEB3_CONV=$(fmt_cell "$WEB3_CONV" $ALL_CONV)
C_OX_CONV=$(fmt_cell "$OX_CONV" $ALL_CONV)

# Compute ratio for full library (essential-eth vs the next-smallest alternative)
# Filter out 0 (N/A) values before finding the smallest alternative
NEXT_SMALLEST=$(echo "$ETH_FULL $VIEM_FULL $WEB3_FULL $OX_FULL" | tr ' ' '\n' | awk '$1 > 0' | sort -n | head -1)
RATIO=$(echo "$NEXT_SMALLEST $EE_FULL" | awk '{ printf "%d", $1 / $2 }')

# ─── 6. Write the table to a temp file ──────────────────────────────────────
TABLE_FILE="$WORK/table.md"
cat > "$TABLE_FILE" <<EOF
### Bundle Size Comparison (ESM, minified)

Measured with esbuild. Smaller is better.

| What you import                          | essential-eth@$EETH_VER | ethers@$ETHERS_VER | viem@$VIEM_VER | web3@$WEB3_VER | ox@$OX_VER |
| ---------------------------------------- | :---------------------: | :----------------: | :------------: | :------------: | :--------: |
| **Full library**                         | $C_EE_FULL | $C_ETH_FULL | $C_VIEM_FULL | $C_WEB3_FULL | $C_OX_FULL |
| **Provider** (getBalance, getBlock, etc) | $C_EE_PROV | $C_ETH_PROV | $C_VIEM_PROV | $C_WEB3_PROV | $C_OX_PROV |
| **Contract** (read-only calls)           | $C_EE_CONT | $C_ETH_CONT | $C_VIEM_CONT | $C_WEB3_CONT | $C_OX_CONT |
| **Conversions** (wei, gwei, ether)       | $C_EE_CONV | $C_ETH_CONV | $C_VIEM_CONV | $C_WEB3_CONV | $C_OX_CONV |

essential-eth is **${RATIO}x smaller** than the nearest alternative for full-library usage.
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
