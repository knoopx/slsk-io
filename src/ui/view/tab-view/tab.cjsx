React = require("react")

module.exports = React.createClass
  displayName: "Tab"
  render: ->
    <div className="tab-view-tab" {...@props}></div>
