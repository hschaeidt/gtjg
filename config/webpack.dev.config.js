const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.js");

module.exports = merge({
  devtool: 'inline-source-map',
  module: {
    rules: [
      { loader: "source-map-loader", test: /\.js$/, enforce: "pre" },
      { loader: "source-map-loader", test: /\.tsx?$/, enforce: "pre" }
    ]
  }
}, baseConfig);
