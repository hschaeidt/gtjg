import {shallow} from "enzyme";
import * as React from "react";
import App, {testId} from "../App";

test("tests run properly", () => {
  const app = shallow(<App />);
  expect(app.find(`[data-test-id='${testId.root}']`)).toBeTruthy();
});
