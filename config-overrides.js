const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackResolve,
} = require('customize-cra');

const {theme} = require('./theme.js')

// overrider CRA webpack config
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars:  theme  , // update ANT UI theme here
    },
  }),
  addWebpackResolve({
    modules: ['node_modules', 'src'],
  }),
);
