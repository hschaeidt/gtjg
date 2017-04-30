import * as webdriver from "selenium-webdriver";
import {WebDriver, WebElement} from "selenium-webdriver";
import AppPage from "./AppPage";

describe("App is visible", () => {
  let driver: WebDriver;
  let appPage: AppPage;

  beforeEach(async () => {
    driver = await new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.firefox())
      .usingServer("http://localhost:4444/wd/hub")
      .build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  test("app container is rendered", async () => {
    await driver.navigate().to("http://localhost:8080/");
    appPage = new AppPage(driver);
    expect(await appPage.isDisplayed()).toBeTruthy();
  });
});
