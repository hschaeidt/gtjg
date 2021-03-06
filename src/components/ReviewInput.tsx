import * as kanawana from "kanawana";
import * as React from "react";

export const testId = {
  root: "ReviewInput",
};

export default class ReviewInput extends React.Component<{}, void> {
  private input: HTMLInputElement;

  public componentDidMount() {
    kanawana.bind(this.input);
  }

  public componentWillUnmount() {
    kanawana.unbind(this.input);
  }

  public render() {
    return (
      <input data-test-id={testId.root} type="text" ref={this.setInputRef} />
    );
  }

  private setInputRef = (input: HTMLInputElement) => this.input = input;
}
