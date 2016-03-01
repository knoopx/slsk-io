React = require("react")

module.exports = React.createClass
  displayName: "ListItem"
  render: ->
    <div className="list-item" {...@props}></div>
