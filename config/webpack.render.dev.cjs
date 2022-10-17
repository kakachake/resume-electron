const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.cjs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

module.exports = renderConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: path.resolve(__dirname, '../app/renderer/index.tsx'),
  },
  target: 'electron-renderer',
  output: {
    filename: '[name].[hashContent].js',
    path: path.resolve(__dirname, '../dist/'),
  },
  module: {
    rules: [
      {
        test: /\.jpg|png|gif|bmp|ttf|svg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/renderer/index.html'),
      filename: 'index.html',
    }),
    new PreloadWebpackPlugin({
      rel: 'preload', // preload兼容性更好
      as: 'script',
      // rel: 'prefetch' // prefetch兼容性更差
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, '../dist/'),
    compress: true,
    host: '127.0.0.1', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
    port: 7001, // 启动端口为 7001 的服务
    hot: true,
  },
});
