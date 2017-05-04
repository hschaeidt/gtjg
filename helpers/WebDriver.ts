import {Builder, Capabilities, ThenableWebDriver} from "selenium-webdriver";

const username = process.env.SAUCE_USERNAME || null;
const accessKey = process.env.SAUCE_ACCESS_KEY || null;
let serverUrl = "http://localhost:4444/wd/hub";

if (username !== null && accessKey !== null) {
  serverUrl = `http://${username}:${accessKey}@ondemand.saucelabs.com:80/wd/hub`;
}

export default function getWebDriver(): ThenableWebDriver {
  return new Builder()
    .withCapabilities(Capabilities.firefox())
    .usingServer(serverUrl)
    .build();
}
