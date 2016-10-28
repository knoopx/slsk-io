var React = require("react");

module.exports = React.createClass({
  displayName: "Gutter",
  mixins: [require('react-addons-pure-render-mixin')],
  getDefaultProps: function() {
    return {
      size: 10
    };
  },
  getInitialState: function() {
    return {
      size: this.props.size
    };
  },
  getStyle: function() {
    return {
      width: this.state.size + "px",
      display: "inline-block"
    };
  },
  render: function() {
    return React.createElement("div", {
      "className": "gutter",
      "style": this.getStyle()
    });
  }
});
