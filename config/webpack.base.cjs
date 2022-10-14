const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
    alias: {
      '@assets': path.resolve(__dirname, '../assets'),
      '@root': path.resolve(__dirname, '../'),
      '@src': path.resolve(__dirname, '../app/renderer'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
