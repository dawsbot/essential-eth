const { setup } = require('jest-dev-server');

module.exports = async function globalSetup() {
  await setup({
    command: `node test/server`,
    launchTimeout: 10000,
  });
};
