import {By, WebDriver, WebElementPromise} from "selenium-webdriver";
import {testId} from "../App";

const byTestId = (testId: string) => {
  return By.css(`[data-test-id='${testId}']`);
};

export default class AppPage {
  public root: WebElementPromise;
  private driver: WebDriver;

  constructor(driver: WebDriver) {
    this.driver = driver;
    this.root = this.driver.findElement(byTestId(testId.root));
  }

  public async isDisplayed() {
    const root = await this.root;
    return root.isDisplayed();
  }
}
