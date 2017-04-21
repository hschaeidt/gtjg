const path = require("path");

module.exports = {
  entry: "./src/app.tsx",
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: 'app.js',
  },
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".jsx" ]
  },
  module: {
    rules: [ { loader: "awesome-typescript-loader", test: /\.tsx?$/ } ]
  }
};
