require("sugar")
require("source-map-support/register")

React = require("react")
ReactDOM = require("react-dom")

App = require("./app")
state = require("./state")
app = React.createElement(App, state: state)

ReactDOM.render(app, document.querySelector("#root"))

# Test = require("./test")
# ReactDOM.render(React.createElement(Test, state: require("./state")), document.querySelector("#root"))
