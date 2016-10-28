var React = require("react");
var Immutable = require("immutable");

export default React.createClass({
  displayName: "Test",
  getInitialState() {
    return this.props.state;
  },
  render() {
    return React.createElement("div", null, this.state.value);
  }
});
