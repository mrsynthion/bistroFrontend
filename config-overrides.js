const path = require('path');
const { addWebpackAlias } = require('customize-cra');

module.exports = function override(config, env) {
  config = addWebpackAlias({
    ['@src']: path.resolve(__dirname, 'src'),
    ['@assets']: path.resolve(__dirname, 'assets'),
    ['@components']: path.resolve(__dirname, 'components'),
    ['@services']: path.resolve(__dirname, 'services'),
    ['@store']: path.resolve(__dirname, 'store'),
    ['@utils']: path.resolve(__dirname, 'utils'),
    ['@views']: path.resolve(__dirname, 'src', 'views'),
  })(config);

  return config;
};
