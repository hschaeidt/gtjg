const webpack = require('webpack');
const merge = require('webpack-merge');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const baseConfig = require('./webpack.config.js');

module.exports = merge({
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new SWPrecacheWebpackPlugin({
      cacheId: 'gtjg',
      filename: 'gtjg-sw.js',
      staticFileGlobs: ['public/**/*.{js,html,css,png,jpg,gif}'],
      stripPrefix: 'public',
      minify: true
    })
  ],
}, baseConfig);
