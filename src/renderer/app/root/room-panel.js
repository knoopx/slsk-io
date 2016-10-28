// Generated by CoffeeScript 1.10.0
let Column

let Divider
let Gutter
let List
let ListItem
let Row
let ref
let ref1

import React from 'react'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import UI from '../../ui'
const Toolbar = UI.Toolbar

ref = UI.Layout, Row = ref.Row, Column = ref.Column, Divider = ref.Divider, Gutter = ref.Gutter

ref1 = UI.List, List = ref1.List, ListItem = ref1.ListItem

const ScrollView = UI.View.ScrollView

export default class extends React.Component {
  static displayName = 'RoomPanel'

  static propTypes = {
    rooms: ImmutablePropTypes.list,
    onSelect: React.PropTypes.func
  }

  state = {
    rooms: this.props.rooms
  }

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
    return (<Column>
      <Toolbar>Rooms (
        { this.state.rooms.count() })</Toolbar>
      <ScrollView>
        <List>
          { this.state.rooms.sortBy(r => -r.users).map(this.renderItem) }
        </List>
      </ScrollView>
    </Column>)
  }

  renderItem = (room) => {
    return (<ListItem key={room.name} onClick={() => {
      return this.props.onSelect(room)
    }}
    >
      { room.name } (
      { room.users })</ListItem>)
  }
}
