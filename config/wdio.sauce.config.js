const wdio = require("./wdio.config.js");

exports.config = Object.assign({}, wdio.config, {
  capabilities: [{
    browserName: "firefox",
  }],
  services: ['sauce'],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  sauceConnect: true,
});
