import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as merge from "webpack-merge";

export default merge({}, {
  entry: "./src/index.tsx",
  module: {
    rules: [
      { loader: "awesome-typescript-loader", test: /\.tsx?$/ },
      { loader: "tslint-loader", test: /\.tsx?$/, enforce: "pre" },
    ],
  },
  output: {
    filename: "app.js",
    path: path.join(__dirname, "..", "public"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.ejs",
    }),
  ],
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".jsx" ],
  },
});
