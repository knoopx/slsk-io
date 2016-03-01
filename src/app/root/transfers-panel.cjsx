React = require("react")

UI = require("../../ui")
{Toolbar} = UI
{Row, Column, Divider, Gutter} = UI.Layout

module.exports = React.createClass
  displayName: "TransfersPanel"
  render: ->
    <Row flex={2}>
      <Column>
        <Toolbar>Downloads</Toolbar>
      </Column>
      <Divider vertical />
      <Column>
        <Toolbar>Uploads</Toolbar>
      </Column>
    </Row>
