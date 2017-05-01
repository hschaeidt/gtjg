import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";

export default {
  entry: "./src/index.tsx",
  module: {
    rules: [
      { loader: "awesome-typescript-loader", test: /\.tsx?$/ },
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
};
