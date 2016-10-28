import React from "react";

export default class extends React.Component {
  static displayName = "List";

  render() {
    return React.createElement("div", Object.assign({
      className: "list",
    }, this.props));
  }
};
