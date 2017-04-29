const glob = require("glob");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

/**
 * Extracts the filename for each path in a list of paths.
 *
 * If we would just feed the list of paths with no keys, webpack would generate just one file out of all the tests. But
 * in order to run our tests context independant (per test file) we need every test in it's own file, with it's own
 * AVA context.
 *
 * @param list
 * @returns {{}}
 */
const generateEntryList = (list) => {
  const entryList = {};

  for (let filePath of list) {
    const entryName = filePath.match(/\/(.*).tsx?$/);
    if (entryName && entryName[1]) {
      entryList[entryName[1]] = filePath;
    }
  }

  return entryList;
};

module.exports = {
  entry: generateEntryList([
    ...glob.sync("./src/**/*{spec,test}.ts"),
    ...glob.sync("./src/**/*{spec,test}.tsx")
  ]),
  output: {
    path: path.join(__dirname, '..', 'tests'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".jsx" ]
  },
  module: {
    rules: [
      { loader: "awesome-typescript-loader", test: /\.tsx?$/ },
      { loader: 'json-loader', test: /\.json$/ },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: "source-map-loader"
      }
    ],
  },
  devtool: 'inline-source-map',
};
