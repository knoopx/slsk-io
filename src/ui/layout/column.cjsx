React = require("react")

module.exports = React.createClass
  displayName: "Column"
  mixins: [require('react-addons-pure-render-mixin')]

  getDefaultProps: ->
    display: "flex"
    flex: 12

  getStyle: ->
    display: @props.display
    flex: @props.flex
    flexDirection: "column"
    flexWrap: "nowrap"
    overflow: @props.overflow
    textOverflow: "ellipsis"
    whiteSpace: "nowrap"
    padding: @props.padding
    alignItems: @props.alignItems
    alignSelf: @props.alignSelf
    minWidth: 0

  render: ->
    <div className="column" {...@props} style={Object.merge(@getStyle(), @props.style)}/>
