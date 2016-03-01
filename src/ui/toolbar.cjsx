React = require("react")

{Row} = require("./layout")

module.exports = React.createClass
  displayName: "Toolbar"
  render: ->
    <Row className="toolbar" {...@props}></Row>
