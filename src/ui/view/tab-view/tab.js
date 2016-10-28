var React = require("react");

export default React.createClass({
  displayName: "Tab",
  render() {
    return React.createElement("div", Object.assign({
      "className": "tab-view-tab"
    }, this.props));
  }
});
