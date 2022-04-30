const { functionsMarkdown } = require('./build-readme');
module.exports = {
  transforms: {
    FUNCTIONS(content, options) {
      return functionsMarkdown;
    },
  },
  callback: function () {
    console.log('markdown processing done');
  },
};
