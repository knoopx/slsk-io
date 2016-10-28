import React from "react";

export default React.createClass({
  displayName: "Column",
  mixins: [require('react-addons-pure-render-mixin')],

  getDefaultProps() {
    return {
      display: "flex",
      flex: 12,
    };
  },

  getStyle() {
    return {
      display: this.props.display,
      flex: this.props.flex,
      flexDirection: "column",
      flexWrap: "nowrap",
      overflow: this.props.overflow,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      padding: this.props.padding,
      alignItems: this.props.alignItems,
      alignSelf: this.props.alignSelf,
      minWidth: 0,
    };
  },

  render() {
    return React.createElement("div", Object.assign({
      className: "column",
    }, this.props, {
      style: Object.merge(this.getStyle(), this.props.style),
    }));
  },
});
