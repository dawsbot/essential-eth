const basicOptions = require('./options.js');
const version =
  process.env.npm_package_version; /* auto-pulls from package.json */

module.exports = {
  ...basicOptions,
  out: `../website/${version}`,
};
