const path = require('path');
const { getPackageStats } = require('package-build-stats');
getPackageStats(path.join(__dirname, '..'), {}).then((results) => {
  console.log(results);
});
