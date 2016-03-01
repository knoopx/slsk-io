React = require("react")

module.exports = React.createClass
  displayName: "Row"
  mixins: [require('react-addons-pure-render-mixin')]

  getDefaultProps: ->
    display: "flex"
    flex: 12

  getStyle: ->
    display: @props.display
    flex: @props.flex
    flexDirection: "row"
    flexWrap: @props.flexWrap || "nowrap"
    overflow: @props.overflow
    textOverflow: "ellipsis"
    whiteSpace: "nowrap"
    padding: @props.padding
    alignItems: @props.alignItems
    alignSelf: @props.alignSelf

  render: ->
    <div className="row" {...@props} style={Object.merge(@getStyle(), @props.style)}/>
