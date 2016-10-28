var React = require("react");
var Row = require("./layout").Row;

module.exports = React.createClass({
  displayName: "Toolbar",
  render: function() {
    return React.createElement(Row, Object.assign({
      "className": "toolbar"
    }, this.props));
  }
});
