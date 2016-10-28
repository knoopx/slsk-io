var React = require("react");
var Row = require("./layout").Row;

export default React.createClass({
  displayName: "Toolbar",
  render: function() {
    return React.createElement(Row, Object.assign({
      "className": "toolbar"
    }, this.props));
  }
});
