const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
  ],
  framework: '@storybook/react',

  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin()),
      // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
      // You can change the configuration based on that.
      // 'PRODUCTION' is used when building the static version of storybook.

      // Make whatever fine-grained changes you need
      config.module.rules.push({
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../src'),
      });

    // Return the altered config
    return config;
  },
};
