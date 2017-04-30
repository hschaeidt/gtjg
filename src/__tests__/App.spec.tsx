import {WebDriver} from "selenium-webdriver";
import getWebDriver from "../../helpers/WebDriver";
import AppPage from "./AppPage";

describe("App is visible", () => {
  let driver: WebDriver;
  let appPage: AppPage;

  beforeEach(async () => {
    driver = await getWebDriver();
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
