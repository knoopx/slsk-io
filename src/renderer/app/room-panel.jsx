import React from 'react'
import { Toolbar, Lists, Layout, View } from '../ui'

const { List, ListItem } = Lists
const { ScrollView } = View
const { Column } = Layout

export default class RoomPanel extends React.Component {
  componentWillReceiveProps(nextProps) {
    return this.setRooms(nextProps.rooms)
  }

  setRooms = (rooms, fn) => {
    if (rooms != null) {
      return this.setState({
        rooms
      }, fn)
    }
  }

  render() {
    return (
      <Column>
        <Toolbar>Rooms ({ this.state.rooms.count() })</Toolbar>
        <ScrollView>
          <List>
            { this.state.rooms.sortBy(r => -r.users).map(this.renderItem) }
          </List>
        </ScrollView>
      </Column>
    )
  }

  renderItem = room => (
    <ListItem key={room.name} onClick={() => { this.props.onSelect(room) }}>
      {room.name} ({room.users})
    </ListItem>
  )
}
