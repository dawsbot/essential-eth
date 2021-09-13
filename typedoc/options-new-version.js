const version =
  process.env.npm_package_version; /* auto-pulls from package.json */

module.exports = {
  entryPoints: ['../src'],
  out: `../website/${version}`,
  includeVersion: true,
  hideGenerator: true,
};
