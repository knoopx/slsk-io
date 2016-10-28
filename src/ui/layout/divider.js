import React from "react";

export default React.createClass({
  displayName: "Divider",
  mixins: [require('react-addons-pure-render-mixin')],

  getStyle() {
    if ("vertical" in this.props) {
      return {
        borderRight: "1px solid #ccc",
        flexBasis: "0",
      };
    } else {
      return {
        borderBottom: "1px solid #ccc",
        flexBasis: "0",
      };
    }
  },

  render() {
    return React.createElement(
      "div",
      {
        className: "divider",
        style: this.getStyle(),
      },
    );
  },
});
