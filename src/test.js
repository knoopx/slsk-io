import React from "react";
import Immutable from "immutable";

export default React.createClass({
  displayName: "Test",

  getInitialState() {
    return this.props.state;
  },

  render() {
    return React.createElement("div", null, this.state.value);
  },
});
