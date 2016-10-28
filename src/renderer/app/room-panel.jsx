import React from 'react'
import { sortBy } from 'lodash'
import { Toolbar, Lists, Layout, View } from '../ui'
import { appStore } from '../stores'

const { List, ListItem } = Lists
const { ScrollView } = View
const { Column } = Layout


export default class RoomPanel extends React.Component {
  render() {
    return (
      <Column>
        <Toolbar>Rooms ({ appStore.rooms.length })</Toolbar>
        <ScrollView>
          <List>
            {sortBy(appStore.rooms, 'users').map(this.renderItem)}
          </List>
        </ScrollView>
      </Column>
    )
  }

  renderItem = room => (
    <ListItem key={room.name} onClick={() => appStore.client.joinRoom(room.name)}>
      {room.name} ({room.users})
    </ListItem>
  )
}
