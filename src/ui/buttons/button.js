var React = require("react");

module.exports = React.createClass({
  displayName: "Button",
  mixins: [require('react-addons-pure-render-mixin')],
  render: function() {
    return React.createElement("div", Object.assign({
      "className": "btn btn-default"
    }, this.props));
  }
});
