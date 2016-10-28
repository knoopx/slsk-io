import React from "react";

export default React.createClass({
  displayName: "Row",
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
      flexDirection: "row",
      flexWrap: this.props.flexWrap || "nowrap",
      overflow: this.props.overflow,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      padding: this.props.padding,
      alignItems: this.props.alignItems,
      alignSelf: this.props.alignSelf,
    };
  },

  render() {
    return <div
      className="row"
      {...this.props}
      style={Object.merge(this.getStyle(), this.props.style)} />;
  },
});
