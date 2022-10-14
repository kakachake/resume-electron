const path = require('path');
const baseConfig = require('./webpack.base.cjs');
const { merge } = require('webpack-merge');

module.exports = mainConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../app/main/electron.ts'),
  target: 'electron-main',
  output: {
    filename: 'electron.cjs',
    path: path.resolve(__dirname, '../dist/'),
  },
});
