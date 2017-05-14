import appPage from "./AppPage";

describe("App is visible", () => {
  test("app container is rendered", async () => {
    appPage.open();
    expect(await appPage.isDisplayed()).toBeTruthy();
  });
});
