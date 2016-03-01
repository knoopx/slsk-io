React = require("react")

UI = require("../../ui")
{Toolbar} = UI
{Row, Column, Divider, Gutter} = UI.Layout
{List, ListItem} = UI.List
{ScrollView} = UI.View
{Button} = UI.Buttons

module.exports = React.createClass
  displayName: "UsersPanel"
  render: ->
    <Column>
      <Toolbar>
        <Row alignItems="center">
          <Column><span>Users ({@props.users.count()})</span></Column>
          <Button><i className="fa fa-plus" /></Button>
        </Row>
      </Toolbar>
      <ScrollView>
        <List>
          {@props.users.sort().map (user) -> <ListItem key={user}>{user}</ListItem>}
        </List>
      </ScrollView>
    </Column>
