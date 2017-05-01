import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as OfflinePlugin from "offline-plugin";
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
  plugins: [
    new OfflinePlugin(),
    new CleanWebpackPlugin([Path.output], {
      root: Path.projectRoot,
      verbose: true,
    }),
  ],
});
