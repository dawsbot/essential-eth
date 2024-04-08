import path from 'path';
import { functionsMarkdown, providerMarkdown } from './parse-typedoc';

import markdownMagic from 'markdown-magic';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const readmePath = path.join(__dirname, '..', '..', 'README.md');

markdownMagic(readmePath, {
  transforms: {
    FUNCTIONS() {
      return functionsMarkdown;
    },
    PROVIDER() {
      return providerMarkdown;
    },
    UNPKG_SCRIPT_TAG() {
      return `
\`\`\`html
<!-- index.html -->
<script src="https://unpkg.com/essential-eth@${process.env.npm_package_version}"></script>
\`\`\`
      `;
    },
  },
  callback: function () {
    // eslint-disable-next-line no-console
    console.log('✨ Markdown magic done');
  },
});
