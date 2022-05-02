const { functionsMarkdown } = require('./scripts/markdown-magic/parse-typedoc');
module.exports = {
  transforms: {
    FUNCTIONS(content, options) {
      return functionsMarkdown;
    },
  },
  callback: function () {
    console.log('✨ Markdown magic done');
  },
};
