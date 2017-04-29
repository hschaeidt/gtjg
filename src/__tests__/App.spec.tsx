import * as webdriver from "selenium-webdriver";
import {WebDriver, WebElement} from "selenium-webdriver";

describe("App is visible", () => {
  let driver: WebDriver;

  beforeEach(async () => {
    driver = await new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .withCapabilities(webdriver.Capabilities.firefox())
      .usingServer("http://localhost:4444/wd/hub")
      .build();
  });

  afterEach(async () => {
    await driver.quit();
  });

  test("we are at google", async () => {
    await driver.navigate().to("http://google.de/");
    const element: WebElement = await driver.findElement(webdriver.By.className("sbib_b"));
    expect(await element.getTagName()).toBe("div");
  });

  test("we are at google once again", async () => {
    await driver.navigate().to("http://google.de/");
    const element: WebElement = await driver.findElement(webdriver.By.className("sbib_b"));
    expect(await element.getTagName()).toBe("div");
  });
});
