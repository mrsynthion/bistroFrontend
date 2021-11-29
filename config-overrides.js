const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
module.exports = override(
  rewireReactHotLoader,
  addWebpackAlias({
    ['@src']: path.resolve(__dirname, 'src'),
    ['@assets']: path.resolve(__dirname, 'src', 'assets'),
    ['@components']: path.resolve(__dirname, 'src', 'components'),
    ['@services']: path.resolve(__dirname, 'src', 'services'),
    ['@store']: path.resolve(__dirname, 'src', 'store'),
    ['@utils']: path.resolve(__dirname, 'src', 'utils'),
    ['@views']: path.resolve(__dirname, 'src', 'views'),
    ['@theme']: path.resolve(__dirname, 'src', 'theme'),
  })
);
