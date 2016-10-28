var React = require("react");

export default React.createClass({
  displayName: "ListItem",
  render: function() {
    return React.createElement("div", Object.assign({
      "className": "list-item"
    }, this.props));
  }
});
