// Generated by CoffeeScript 1.10.0
var Immutable, React;

React = require("react");

Immutable = require("immutable");

module.exports = React.createClass({
  displayName: "Test",
  getInitialState: function() {
    return this.props.state;
  },
  render: function() {
    return React.createElement("div", null, this.state.value);
  }
});