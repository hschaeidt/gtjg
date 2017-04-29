import test from "ava";
import * as webdriver from "selenium-webdriver";
import {WebElement} from "selenium-webdriver";

test.beforeEach(async (t) => {
  t.context.driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .withCapabilities(webdriver.Capabilities.firefox())
    .usingServer("http://localhost:4444/wd/hub")
    .build();
});

test.afterEach(async (t) => {
  await t.context.driver.quit();
});

test("we are at google", async (t) => {
  const driver = await t.context.driver;
  await driver.navigate().to("http://google.de/");
  const element: WebElement = await driver.findElement(webdriver.By.className("sbib_b"));
  t.is(await element.getTagName(), "div");
});

test("we are at google once again", async (t) => {
  const driver = await t.context.driver;
  await driver.navigate().to("http://google.de/");
  const element: WebElement = await driver.findElement(webdriver.By.className("sbib_b"));
  t.is(await element.getTagName(), "div");
});
