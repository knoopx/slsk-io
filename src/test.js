var React = require("react");
var Immutable = require("immutable");

module.exports = React.createClass({
  displayName: "Test",
  getInitialState: function() {
    return this.props.state;
  },
  render: function() {
    return React.createElement("div", null, this.state.value);
  }
});
