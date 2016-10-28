var React = require("react");
var Immutable = require("immutable");

export default React.createClass({
  displayName: "Test",
  getInitialState: function() {
    return this.props.state;
  },
  render: function() {
    return React.createElement("div", null, this.state.value);
  }
});
