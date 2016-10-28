var React = require("react");

export default React.createClass({
  displayName: "List",
  render: function() {
    return React.createElement("div", Object.assign({
      "className": "list"
    }, this.props));
  }
});
