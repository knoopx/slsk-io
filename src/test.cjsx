React = require("react")
Immutable = require("immutable")

module.exports = React.createClass
  displayName: "Test"
  getInitialState: ->
    @props.state

  render: ->
    <div>
      {@state.value}
    </div>
