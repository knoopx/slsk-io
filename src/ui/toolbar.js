import React from "react";
const Row = require("./layout").Row;

export default class extends React.Component {
  static displayName = "Toolbar";

  render() {
    return React.createElement(Row, Object.assign({
      className: "toolbar",
    }, this.props));
  }
};
