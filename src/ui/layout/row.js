var React = require("react");

module.exports = React.createClass({
  displayName: "Row",
  mixins: [require('react-addons-pure-render-mixin')],
  getDefaultProps: function() {
    return {
      display: "flex",
      flex: 12
    };
  },
  getStyle: function() {
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
      alignSelf: this.props.alignSelf
    };
  },
  render: function() {
    return React.createElement("div", Object.assign({
      "className": "row"
    }, this.props, {
      "style": Object.merge(this.getStyle(), this.props.style)
    }));
  }
});
