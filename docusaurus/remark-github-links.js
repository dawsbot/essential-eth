// converts all relative links in markdown files to absolute links, using a base URL.
const visit = require("unist-util-visit");

const GITHUB_BASE_URL = "https://github.com/dawsbot/essential-eth/tree/master/";

function githubLinks() {
  return (tree) => {
    visit(tree, "link", (node) => {
      const url = node.url;
      if (!url.startsWith("https")) {
        node.url = GITHUB_BASE_URL + url;
      }
    });
  };
}

module.exports = githubLinks;