import React from "react";
var Row = require("./layout").Row;

export default React.createClass({
  displayName: "Toolbar",
  render() {
    return React.createElement(Row, Object.assign({
      "className": "toolbar"
    }, this.props));
  }
});
