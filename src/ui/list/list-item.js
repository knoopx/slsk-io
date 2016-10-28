import React from "react";

export default class extends React.Component {
  static displayName = "ListItem";

  render() {
    return React.createElement("div", Object.assign({
      className: "list-item",
    }, this.props));
  }
};
