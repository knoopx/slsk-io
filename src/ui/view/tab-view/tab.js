var React = require("react");

module.exports = React.createClass({
  displayName: "Tab",
  render: function() {
    return React.createElement("div", Object.assign({
      "className": "tab-view-tab"
    }, this.props));
  }
});
