const webpack = require('webpack');
const merge = require('webpack-merge');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.config.js');

const serviceWorker = {
  filename: 'gtjg-sw.js'
};

module.exports = merge({
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: false,
      serviceWorker: `/${serviceWorker.filename}`,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new SWPrecacheWebpackPlugin({
      cacheId: 'gtjg',
      filename: serviceWorker.filename,
      stripPrefix: 'public',
      minify: true
    })
  ],
}, baseConfig);
