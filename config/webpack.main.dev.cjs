const path = require('path');
const baseConfig = require('./webpack.base.cjs');
const { merge } = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';

module.exports = mainConfig = merge(baseConfig, {
  mode: isDev ? 'development' : 'production',
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../app/main/electron.ts'),
  target: 'electron-main',
  output: {
    filename: isDev ? 'electron.cjs' : 'electron.cjs',
    path: path.resolve(__dirname, '../dist/'),
  },
});
