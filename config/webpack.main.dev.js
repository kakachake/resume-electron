const path = require("path");
const baseConfig = require("./webpack.base");
const webpackMerge = require("webpack-merge");

module.exports = mainConfig = webpackMerge(baseConfig, {
  mode: "development",
  entry: path.resolve(__dirname, "../app/main/electron.js"),
  target: "electron-main",
  output: {
    filename: "electron.js",
    path: path.resolve(__dirname, "../dist/main"),
  },
  devtool: "source-map",
});
