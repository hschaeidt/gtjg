const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: 'app.js',
  },
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".jsx" ]
  },
  module: {
    rules: [
      { loader: "awesome-typescript-loader", test: /\.tsx?$/ }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
    }),
  ]
};
