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
  },
  callback: function () {
    console.log('✨ Markdown magic done');
  },
};
