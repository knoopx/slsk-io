import React from "react";
const Row = require("./layout").Row;

export default class extends React.Component {
  static displayName = "Toolbar";

  render() {
    return <Row className="toolbar" {...this.props} />;
  }
};
