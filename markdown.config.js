const {
  functionsMarkdown,
  providerMarkdown,
} = require('./scripts/markdown-magic/parse-typedoc');

module.exports = {
  transforms: {
    FUNCTIONS(content, options) {
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
    console.log('✨ Markdown magic done');
  },
};
