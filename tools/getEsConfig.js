module.exports = function () {
  let my = {};
  my = require('../tsconfig.json')
  return Object.assign(
    my.compilerOptions,
    {
      noUnusedParameters: true,
      noUnusedLocals: true,
      strictNullChecks: true,
    }
  );
};
