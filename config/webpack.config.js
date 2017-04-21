module.exports = {
  entry: "./src/app.tsx",
  output: {
    filename: "./public/app.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx" ]
  },
  module: {
    rules: [ { loader: "awesome-typescript-loader", test: /\.tsx?$/ } ]
  }
};
