var React = require("react");

module.exports = React.createClass({
  displayName: "List",
  render: function() {
    return React.createElement("div", Object.assign({
      "className": "list"
    }, this.props));
  }
});
