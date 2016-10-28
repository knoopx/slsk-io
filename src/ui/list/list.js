import React from "react";

export default React.createClass({
  displayName: "List",

  render() {
    return React.createElement("div", Object.assign({
      "className": "list",
    }, this.props));
  },
});
