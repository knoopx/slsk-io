import React from "react";
import Immutable from "immutable";

export default class extends React.Component {
  static displayName = "Test";
  state = this.props.state;

  render() {
    return React.createElement("div", null, this.state.value);
  }
};
