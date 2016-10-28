require("sugar");

require("source-map-support/register");

var React = require("react");
var ReactDOM = require("react-dom");
var App = require("./app");
var state = require("./state");

var app = React.createElement(App, {
  state: state
});

ReactDOM.render(app, document.querySelector("#root"));
