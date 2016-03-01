React = require("react")

style =
  container:
    overflow: "auto"
    position: "relative"
    flex: 1

  inner:
    position: "absolute"
    left: 0
    top: 0
    right: 0
    bottom: 0

module.exports = React.createClass
  displayName: "ScrollView"

  render: ->
    <div style={style.container}>
      <div style={style.inner}>{@props.children}</div>
    </div>
