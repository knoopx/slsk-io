import React from "react";

export default React.createClass({
  displayName: "ListItem",
  render() {
    return React.createElement("div", Object.assign({
      "className": "list-item"
    }, this.props));
  }
});
