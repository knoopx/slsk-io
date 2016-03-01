React = require("react")

UI = require("../../ui")
{Row, Column, Divider, Gutter} = UI.Layout
{List, ListItem} = UI.List
{ScrollView} = UI.View

module.exports = React.createClass
  displayName: "Chat"

  render: ->
    <List>{@props.messages.map(@renderMessage)}</List>

  renderMessage: (message, index) ->
    <ListItem key={index}>
      <Row>
        <Column flex="2" style={textAlign: "right"}><strong>{message.username}</strong></Column>
        <Gutter/>
        <Column flex="10">{message.message}</Column>
      </Row>
    </ListItem>
