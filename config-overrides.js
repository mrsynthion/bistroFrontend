const path = require('path');
const { addWebpackAlias } = require('customize-cra');

module.exports = function override(config, env) {
  config = addWebpackAlias({
    ['@src']: path.resolve(__dirname, 'src'),
    ['@assets']: path.resolve(__dirname, 'src', 'assets'),
    ['@components']: path.resolve(__dirname, 'src', 'components'),
    ['@services']: path.resolve(__dirname, 'src', 'services'),
    ['@store']: path.resolve(__dirname, 'src', 'store'),
    ['@utils']: path.resolve(__dirname, 'src', 'utils'),
    ['@views']: path.resolve(__dirname, 'src', 'views'),
    ['@theme']: path.resolve(__dirname, 'src', 'theme'),
  })(config);

  return config;
};
