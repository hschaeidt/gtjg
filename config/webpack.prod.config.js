const merge = require('webpack-merge');
const OfflinePlugin = require('offline-plugin');
const baseConfig = require('./webpack.config.js');

/**
 * This configuration relays on webpack being executed with the `-p` (production) option.
 *
 * Though this can also be configured manually if necessary, just remember to remove the `-p` flag in the build process.
 * @see https://webpack.js.org/guides/production-build/#the-manual-way
 */

// The merge order makes sure that the OfflinPlugin is loaded last. It is recommended to execute it last, to let it
// also cache resources generated from other plugin (example: HtmlWebpackPlugin).
module.exports = merge(baseConfig, {
  plugins: [
    new OfflinePlugin()
  ],
});
