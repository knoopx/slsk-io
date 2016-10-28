import React from "react";

export default class extends React.Component {
  static displayName = "Tab";

  render() {
    return React.createElement("div", Object.assign({
      className: "tab-view-tab",
    }, this.props));
  }
};
