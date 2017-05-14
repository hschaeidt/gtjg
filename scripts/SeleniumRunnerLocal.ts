import * as Webpack from "webpack";
import * as DevServer from "webpack-dev-server";
import webpackDevConfig from "../config/webpack.dev.config";

/**
 * Small helper executing end-to-end test dependencies in the correct order
 * -> start selenium-standalone
 * -> start webpack-dev-server
 * -> start jest with testRegex on spec files
 */

// Webpack compiler instance using the `config/webpack.dev.config`
const webpack = Webpack(webpackDevConfig, (err: Error, stats: Webpack.Stats) => {
  if (err || stats.hasErrors()) {
    console.warn(err.name, err.message);
  }
}) as Webpack.Compiler;

// Webpack Dev Server intsance using the webpack compiler and some really basic config
const devServer = new DevServer(webpack, {
  noInfo: true,
  publicPath: "/",
  quiet: true,
});

// Small wrapper around webpack-dev-server start returning a Promise
// Useful for `async - await` usage
// @see main()
function startDevServer(): Promise<{}> {
  return new Promise((resolve, reject) => {
    devServer.listen(8081, "localhost", () => {
      console.info("---> webpack dev server started on port 8081");
      console.info("---> waiting 5 seconds for the dev server to compile");
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  });
}

// start dependencies in the correct order
async function main() {
  await startDevServer();
}

// run jest when all dependencies are running
main().then(() => {
  console.info("---> end2end test dependencies running");
  console.info("<--- running end2end tests");

  require("webdriverio/build/lib/cli");
});
