React = require("react")
Immutable = require("immutable")
ImmutablePropTypes = require('react-immutable-proptypes')

UI = require("../../ui")
{Toolbar} = UI
{Row, Column, Divider, Gutter} = UI.Layout
{List, ListItem} = UI.List
{ScrollView} = UI.View

module.exports = React.createClass
  displayName: "RoomPanel"

  propTypes:
    rooms: ImmutablePropTypes.list
    onSelect: React.PropTypes.func

  getInitialState: ->
    rooms: @props.rooms

  componentWillReceiveProps: (nextProps) ->
    @setRooms(nextProps.rooms)

  setRooms: (rooms, fn) ->
    @setState(rooms: rooms, fn) if rooms?

  render: ->
    <Column>
      <Toolbar>Rooms ({@state.rooms.count()})</Toolbar>
      <ScrollView>
        <List>{@state.rooms.sortBy((r) -> -r.users).map(@renderItem)}</List>
      </ScrollView>
    </Column>

  renderItem: (room) ->
    <ListItem key={room.name} onClick={=> @props.onSelect(room)}>{room.name} ({room.users})</ListItem>
