// Generated by CoffeeScript 1.10.0
var App, React, ReactDOM, app, state;

require("sugar");

require("source-map-support/register");

React = require("react");

ReactDOM = require("react-dom");

App = require("./app");

state = require("./state");

app = React.createElement(App, {
  state: state
});

ReactDOM.render(app, document.querySelector("#root"));