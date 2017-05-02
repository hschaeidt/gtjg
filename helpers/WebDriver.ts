import {Builder, Capabilities, ThenableWebDriver} from "selenium-webdriver";

export default function getWebDriver(): ThenableWebDriver {
  return new Builder()
    .withCapabilities(Capabilities.firefox())
    .usingServer("http://localhost:4444/wd/hub")
    .build();
}
