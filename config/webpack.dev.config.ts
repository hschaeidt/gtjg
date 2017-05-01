import * as merge from "webpack-merge";
import baseConfig from "./webpack.config";

export default merge({
  devtool: "inline-source-map",
  module: {
    rules: [
      { loader: "source-map-loader", test: /\.js$/, enforce: "pre" },
      { loader: "source-map-loader", test: /\.tsx?$/, enforce: "pre" },
    ],
  },
}, baseConfig);
