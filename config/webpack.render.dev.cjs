const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.cjs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';
module.exports = renderConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: path.resolve(__dirname, '../app/renderer/Index.tsx'),
    setting: path.resolve(__dirname, '../app/renderer/windowPages/setting/Index.tsx'),
  },
  target: 'electron-renderer',
  output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist/'),
    clean: true,
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less/,
        use: [
          MiniCssExtractPlugin.loader,
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
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../app/renderer/windowPages/setting/index.html'),
      filename: 'setting.html',
      chunks: ['setting'],
    }),
    new PreloadWebpackPlugin({
      rel: 'preload', // preload兼容性更好
      as: 'script',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../assets'),
          to: path.resolve(__dirname, '../dist/assets'),
        },
        // {
        //   from: path.resolve(__dirname, '../appConfig'),
        //   to: path.resolve(__dirname, '../dist/appConfig'),
        // },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, '../dist/'),
    compress: true,
    host: 'localhost', // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
    port: 7001, // 启动端口为 7001 的服务
    hot: true,
  },
  optimization: {
    minimize: isDev ? false : true,
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        extractComments: false,
      }),
    ],
  },
});
