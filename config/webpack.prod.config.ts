import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as OfflinePlugin from "offline-plugin";
import * as webpack from "webpack";
import * as merge from "webpack-merge";
import baseConfig, {Path} from "./webpack.config";

/**
 * This configuration relays on webpack being executed with the `-p` (production) option.
 *
 * Though this can also be configured manually if necessary, just remember to remove the `-p` flag in the build process.
 * @see https://webpack.js.org/guides/production-build/#the-manual-way
 */

// The merge order makes sure that the OfflinPlugin is loaded last. It is recommended to execute it last, to let it
// also cache resources generated from other plugin (example: HtmlWebpackPlugin).
export default merge(baseConfig, {
  output: {
    chunkFilename: "[chunkhash:8].js",
    filename: "[name].[chunkhash:8].js",
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // pull out all dependencies starting with "node_modules" to the vendor package
      minChunks: ({ resource }: { resource: string }) => (
        resource &&
        resource.indexOf("node_modules") >= 0 &&
        resource.match(/\.js$/)
      ),
      name: "vendor",
    }),
    new CleanWebpackPlugin([Path.output], {
      root: Path.projectRoot,
      verbose: true,
    }),
    new OfflinePlugin({
      caches: {
        additional: [
          // All other assets have a chunk hash.
          // SW only fetch them once.
          // They'll have another name on change.
          ":rest:",
        ],
        main: [
          // These assets don't have a chunk hash.
          // SW fetch them on every SW update.
          "index.html",
        ],
      },
      // To remove a warning about additional need to have hash
      safeToUseOptionalCaches: true,
      // "additional" section is fetch only once.
      updateStrategy: "changed",
    }),
  ],
});
