import {testId} from "../App";

const byTestId = (testId: string) => {
  return `[data-test-id='${testId}']`;
};

class AppPage {
    get root() {
      return browser.element(byTestId(testId.root));
    }

    public open() {
      browser.url("/");
    }

    public isDisplayed() {
      const root = this.root;
      return root.isVisible();
    }
}

export default new AppPage();
