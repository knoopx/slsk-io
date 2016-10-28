var React = require("react");

module.exports = React.createClass({
  displayName: "ListItem",
  render: function() {
    return React.createElement("div", Object.assign({
      "className": "list-item"
    }, this.props));
  }
});
