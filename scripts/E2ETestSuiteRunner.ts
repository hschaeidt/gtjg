import * as jest from "jest-cli";
import * as selenium from "selenium-standalone";
import * as Webpack from "webpack";
import * as DevServer from "webpack-dev-server";
import webpackDevConfig from "../config/webpack.dev.config";

const username = process.env.SAUCE_USERNAME || null;
const accessKey = process.env.SAUCE_ACCESS_KEY || null;

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
  noInfo: false,
  publicPath: "/",
  quiet: false,
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

function installSelenium() {
  return new Promise((resolve, reject) => {
    selenium.install(() => {
      resolve();
    });
  });
}

function startSelenium() {
  return new Promise((resolve, reject) => {
    selenium.start((err: any, child: any) => {
      child.stderr.on("data", (data: any) => {
        console.info(data.toString());
      });

      // makes sure to kill the child process if jest exits the main process
      // for example by passing it the `--forceExit` flag
      // this makes sure that the selenium-server is not stopped correctly on process exit
      // alternative: `pkill -f selenium-standalone` before running this script again
      process.on("exit", () => {
        console.info("---> selenium-standalone: stopping background processes");
        child.kill();
      });

      if (err) {
        console.warn("---> selenium-standalone: error occured: ", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// start dependencies in the correct order
async function main() {
  if (username === null || accessKey === null) {
    await installSelenium();
    await startSelenium();
  }

  await startDevServer();
}

// run jest when all dependencies are running
main().then(() => {
  console.info("---> end2end test dependencies running");
  console.info("<--- running end2end tests");
  jest.run();
});
