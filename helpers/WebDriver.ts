import {Builder, Capabilities, ThenableWebDriver} from "selenium-webdriver";

const username = process.env.SAUCE_USERNAME || null;
const accessKey = process.env.SAUCE_ACCESS_KEY || null;
let serverUrl = "http://localhost:4444/wd/hub";

if (username !== null && accessKey !== null) {
  serverUrl = `http://${username}:${accessKey}@ondemand.saucelabs.com:80/wd/hub`;
}

export default function getWebDriver(): ThenableWebDriver {
  const builder = new Builder();

  if (username !== null && accessKey !== null) {
    builder.withCapabilities(
      Capabilities.firefox()
        .set("tunnel-identifier", process.env.TRAVIS_JOB_NUMBER)
        .set("build", process.env.TRAVIS_BUILD_NUMBER)
        .set("username", username)
        .set("accessKey", accessKey),
    );
  } else {
    builder.withCapabilities(Capabilities.firefox());
  }

  return builder
    .usingServer(serverUrl)
    .build();
}
