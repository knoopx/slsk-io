React = require("react")

module.exports = React.createClass
  displayName: "Gutter"
  mixins: [require('react-addons-pure-render-mixin')]

  getDefaultProps: ->
    size: 10

  getInitialState: ->
    size: @props.size

  getStyle: ->
    width: "#{@state.size}px"
    display: "inline-block"

  render: ->
    <div className="gutter" style={@getStyle()}/>
