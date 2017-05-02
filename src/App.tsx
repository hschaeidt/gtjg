import * as React from "react";
import ReviewInput from "./components/ReviewInput";

export const testId = {
  root: "App",
};

export default () => (
  <div data-test-id={testId.root}>
    <ReviewInput />
  </div>
);
