npx npm-check-updates -u  "/.*big.*$/"
npx npm-check-updates -u  "/.*prettier.*$/"
npx npm-check-updates -u  "/.*eslint.*$/"
npx npm-check-updates -u  "/.*jest.*$/"
npx npm-check-updates -u  "/.*@swc.*$/"
npm i
npm i --save-dev ethers@latest web3@latest prettier@latest typescript@latest ts-node@latest @swc/core@latest

