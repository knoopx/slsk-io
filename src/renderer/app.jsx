let Chat

let Column
let Divider
let Gutter
let List
let ListItem
let RoomPanel
let Row
let ScrollView
let Tab
let TabSet
let TabView
let TopToolbar
let TransfersPanel
let UsersPanel
let ref
let ref1
let ref2
let ref3

import React from 'react'
import Immutable from 'immutable'
import Path from 'path'
import UI from './ui'
const Button = UI.Buttons.Button
import { AppContainer } from 'react-hot-loader'

ref = UI.View, ScrollView = ref.ScrollView, TabView = ref.TabView

TabSet = TabView.TabSet, Tab = TabView.Tab

ref1 = UI.Layout, Row = ref1.Row, Column = ref1.Column, Divider = ref1.Divider, Gutter = ref1.Gutter

ref2 = UI.List, List = ref2.List, ListItem = ref2.ListItem

ref3 = require('./app/root'), TopToolbar = ref3.TopToolbar, TransfersPanel = ref3.TransfersPanel, UsersPanel = ref3.UsersPanel, RoomPanel = ref3.RoomPanel, Chat = ref3.Chat

import support from './support'

export default class extends React.Component {
  static displayName = 'App'
  state = window.previousAppState || this.props.state

  pushTab = (tab, fn) => {
    return this.setState(state => ({
      tabs: state.tabs.concat(tab)
    }), fn)
  }

  componentDidMount() {
    if (typeof module.onReload === 'function') {
      module.onReload(() => {
        return window.previousAppState = this.state
      })
    }
    this.state.manager.on('connect', this.onConnected)
    this.state.manager.client.on('login', this.onLogin)
    this.state.manager.client.on('connect to peer', this.onConnectToPeer)
    this.state.manager.client.on('get status', this.onGetStatus)
    this.state.manager.client.on('privileged users', this.onPriviledgedUsers)
    this.state.manager.client.on('private messages', this.onPrivateMessages)
    this.state.manager.client.on('room list', this.onRoomList)
    this.state.manager.client.on('join room', this.onJoinRoom)
    this.state.manager.client.on('room tickers', this.onRoomTickers)
    this.state.manager.client.on('user joined room', this.onUserJoinedRoom)
    this.state.manager.client.on('say in chat room', this.onSayInChatRoom)
    this.state.manager.client.on('user left room', this.onUserLeftRoom)
    return this.state.manager.client.on('get user stats', this.onGetUserStats)
  }

  renderTab = (props, index) => {
    switch (props.type) {
      case 'chatroom':
        const room = this.state.joinedRooms.get(props.name)

        var title = (<Row><i className="fa fa-hashtag" />
          <Gutter /><i /><span>{ room.name } ({ room.users.count() })</span></Row>)

        return (<Tab key={index} title={title}>
          <Row>
            <Column flex="3">
              <ScrollView>
                <List>
                  { room.users.sortBy(u => u.user).map(user => <ListItem key={user.user}><span><strong>{ user.user }</strong><br /><small className="text-muted">{ user.tickers }</small></span></ListItem>) }
                </List>
              </ScrollView>
            </Column>
            <Divider vertical />
            <Column flex="9">
              <ScrollView>
                <Chat messages={room.messages} />
              </ScrollView>
            </Column>
          </Row>
        </Tab>)
      case 'search':
        const matches = this.state.searches.get(props.ticket)

        const renderMatch = function (match, index) {
          return match.results.map((r, index) => <tr key={index}>
            <td><strong>{ match.user }</strong></td>
            <td>
              { Path.basename(r.filename.replace(/\\/g, '/')) }
            </td>
            <td>
              { Path.dirname(r.filename.replace(/\\/g, '/')) }
            </td>
            <td>
              { r.size }
            </td>
          </tr>)
        }

        var title = (<Row><i className="fa fa-search" />
          <Gutter /><span>{ props.query } ({ matches.map(m => m.results.length).toArray().sum() })</span></Row>)

        return (<Tab key={index} title={title}>
          <ScrollView>
            <table>
              { matches.map(renderMatch) }
            </table>
          </ScrollView>
        </Tab>)
    }
  }

  render() {
    return (<AppContainer>
      <Column>
        <TopToolbar isConnected={this.state.isConnected} onSearch={this.performSearch} />
        <Row>
          <Column flex={9.0}>
            <Row flex={10.0}>
              <TabSet>
                { this.state.tabs.map(this.renderTab) }
              </TabSet>
            </Row>
            <Divider />
          </Column>
          <Divider vertical />
          <Column flex={3.0}>
            <UsersPanel users={this.state.users} />
            <Divider />
            <RoomPanel rooms={this.state.rooms} onSelect={this.joinRoom} />
          </Column>
        </Row>
        <TransfersPanel />
      </Column>
    </AppContainer>)
  }

  onConnected = (client) => {
    this.setState({
      isConnected: true
    })
    return this.state.manager.client.login(process.env.USERNAME, process.env.PASSWORD)
  }

  onSayInChatRoom = (reply) => {
    return this.setState(state => ({
      joinedRooms: state.joinedRooms.update(reply.room, room => room.update('messages', messages => messages.push({
        type: 'message',
        username: reply.username,
        message: reply.message,
        timestamp: Date.now()
      })))
    }))
  }

  onUserJoinedRoom = (reply) => {
    return this.setState(state => ({
      joinedRooms: state.joinedRooms.update(reply.room, room => room.update('messages', messages => messages.push({
        type: 'joined',
        username: reply.username,
        timestamp: Date.now()
      })))
    }))
  }

  onUserLeftRoom = (reply) => {
    return this.setState(state => ({
      joinedRooms: state.joinedRooms.update(reply.room, room => room.update('messages', messages => messages.push({
        type: 'left',
        username: reply.username,
        timestamp: Date.now()
      })))
    }))
  }

  onJoinRoom = (reply) => {
  }

  onRoomTickers = (reply) => {
    return this.setState(state => ({
      joinedRooms: state.joinedRooms.update(reply.room, room => room.set('users', reply.users))
    }))
  }

  onGetUserStats = (reply) => {
  }

  onLogin = (payload) => {
    return this.setState({
      isLoggedIn: payload.success
    })
  }

  onGetStatus = (reply) => {
  }

  onPriviledgedUsers = (reply) => {
    return this.setState({
      users: Immutable.List(reply.users)
    })
  }

  onPrivateMessages = (reply) => {
  }
  onUserJoinedRoom = (reply) => {
  }

  onConnectToPeer = (reply) => {
    return this.state.manager.peers[reply.username].on('search reply', this.onSearchReply)
  }

  onSearchReply = (reply) => {
    return this.setState(state => ({
      searches: state.searches.update(reply.ticket, matches => (matches != null ? matches.push(reply) : void 0))
    }))
  }

  onRoomList = (rooms) => {
    return this.setState({
      rooms: Immutable.List(rooms)
    })
  }

  performSearch = (query) => {
    const ticket = support.ticket()
    return this.setState(state => ({
      searches: state.searches.set(ticket, Immutable.List())
    }), () => {
      this.pushTab({
        type: 'search',
        ticket,
        query
      })
      return this.state.manager.client.fileSearch(query, ticket)
    })
  }

  joinRoom = (room) => {
    if (!this.state.joinedRooms.get(room.name)) {
      return this.setState(state => ({
        joinedRooms: state.joinedRooms.set(room.name, new Immutable.Record({
          name: room.name,
          messages: Immutable.List(),
          users: Immutable.Map()
        })())
      }), () => {
        this.pushTab({
          type: 'chatroom',
          name: room.name
        })
        return this.state.manager.client.joinRoom(room.name)
      })
    }
  }
}