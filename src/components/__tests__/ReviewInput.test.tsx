import {mount, ReactWrapper} from "enzyme";
import * as React from "react";
import ReviewInput, {testId} from "../ReviewInput";

describe("<ReviewInput />", () => {
  let reviewInput: ReactWrapper<any, any>;

  beforeEach(() => {
    reviewInput = mount(<ReviewInput />);
  });

  afterEach(() => {
    reviewInput.unmount();
  });

  test("it renders", () => {
    expect(reviewInput.find(`[data-test-id='${testId.root}']`)).toBeTruthy();
  });
});
