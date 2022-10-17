const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.cjs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = renderConfig = merge(baseConfig, {
  mode: isDev ? 'development' : 'production',
  devtool: 'source-map',
  entry: {
    index: path.resolve(__dirname, '../app/renderer/index.tsx'),
  },
  target: 'web',
  output: {
    filename: '[name].[contenthash].js',
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
    new DefinePlugin({
      'process.env.target': JSON.stringify('web'),
    }),
    !isDev ? new BundleAnalyzerPlugin() : () => void 0,
  ],
  devServer: {
    static: path.resolve(__dirname, '../dist/'),
    compress: true,
    host: 'localhost', //
    port: 7001, // 启动端口为 7001 的服务
    hot: true,
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
  },
});
