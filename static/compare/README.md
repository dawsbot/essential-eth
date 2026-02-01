# Bundle Size Comparison Page

An interactive, self-contained HTML page that visually compares the bundle sizes of **essential-eth** against other popular Ethereum libraries: ethers v6, viem, web3.js, and ox.

## Features

- **Visual bar charts** — CSS-only animated bars showing relative bundle sizes at a glance
- **Category breakdown** — Compare Provider, Contract, and Conversions imports individually
- **Savings calculator** — Select which imports you use (Provider, Contract, Conversions) and instantly see how much you'd save by switching to essential-eth
- **Shareable URLs** — Checkbox state is encoded into the URL hash (`#pcv`), so you can share your specific comparison
- **Zero dependencies** — Single HTML file, no build step, no JavaScript libraries
- **Dark theme** — Designed to look great when shared on social media

## Data

All sizes are **minified + gzipped**, measured via [bundlephobia](https://bundlephobia.com).

| Category    | essential-eth | ethers v6 | viem   | web3.js | ox     |
|-------------|---------------|-----------|--------|---------|--------|
| Provider    | 28.9 kB       | 260.0 kB  | 269.5 kB | 465.3 kB | 10.9 kB |
| Contract    | 24.8 kB       | 86.6 kB   | 179.8 kB | 276.5 kB | 49.9 kB |
| Conversions | 1.2 kB        | 10.4 kB   | 2.7 kB   | 465.3 kB | 3.7 kB  |
| **Total**   | **39.9 kB**   | **394.0 kB** | **348.3 kB** | **506.6 kB** | **615.6 kB** |

## How to Host

### Option 1: Open locally
```bash
open static/compare/index.html
```

### Option 2: Serve with any static server
```bash
npx serve static/compare
# or
python3 -m http.server 8000 --directory static/compare
```

### Option 3: Deploy to GitHub Pages / Vercel / Netlify
Just point the deployment to the `static/compare/` directory. The page is a single self-contained HTML file with no external dependencies.

### Option 4: Embed in docs
The Docusaurus site can serve this from `static/compare/` and it will be available at `/compare/` on the docs site.

## URL Hash Format

The savings calculator state is encoded in the URL hash:
- `p` = Provider selected
- `c` = Contract selected  
- `v` = Conversions selected

Examples:
- `#pcv` — all three selected
- `#pc` — Provider + Contract
- `#v` — Conversions only

## Updating Data

Edit the `categories` object in the `<script>` tag of `index.html`:

```javascript
const categories = {
  provider:    { label: 'Provider',    ee: 28.9, ethers: 260.0, viem: 269.5, web3: 465.3, ox: 10.9 },
  contract:    { label: 'Contract',    ee: 24.8, ethers: 86.6,  viem: 179.8, web3: 276.5, ox: 49.9 },
  conversions: { label: 'Conversions', ee: 1.2,  ethers: 10.4,  viem: 2.7,   web3: 465.3, ox: 3.7  }
};
```

Also update the totals in the hero section and data table HTML.
