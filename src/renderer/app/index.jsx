import React from 'react'
import Path from 'path'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { AppContainer } from 'react-hot-loader'

import Chat from './chat'
import TopToolbar from './top-toolbar'
import UsersPanel from './users-panel'
import RoomPanel from './room-panel'
import TransfersPanel from './transfers-panel'

import { Toolbar, Tabs, Lists, Buttons, Layout, View } from '../ui'
const { Button } = Buttons
const { List, ListItem } = Lists
const { ScrollView } = View
const { Row, Column, Gutter, Divider } = Layout
const { TabSet, Tab } = View.TabView


@observer
export default class App extends React.Component {
  @observable tabs = []

  // componentDidMount() {
  //   this.state.manager.on('connect', this.onConnected)
  //   this.state.manager.client.on('login', this.onLogin)
  //   this.state.manager.client.on('connect to peer', this.onConnectToPeer)
  //   this.state.manager.client.on('get status', this.onGetStatus)
  //   this.state.manager.client.on('privileged users', this.onPriviledgedUsers)
  //   this.state.manager.client.on('private messages', this.onPrivateMessages)
  //   this.state.manager.client.on('room list', this.onRoomList)
  //   this.state.manager.client.on('join room', this.onJoinRoom)
  //   this.state.manager.client.on('room tickers', this.onRoomTickers)
  //   this.state.manager.client.on('user joined room', this.onUserJoinedRoom)
  //   this.state.manager.client.on('say in chat room', this.onSayInChatRoom)
  //   this.state.manager.client.on('user left room', this.onUserLeftRoom)
  //   return this.state.manager.client.on('get user stats', this.onGetUserStats)
  // }
  //
  // pushTab = (tab, fn) => {
  //   return this.setState(state => ({
  //     tabs: state.tabs.concat(tab)
  //   }), fn)
  // }
  //
  // renderTab = (props, index) => {
  //   switch (props.type) {
  //     case 'chatroom':
  //       const room = this.state.joinedRooms.get(props.name)
  //
  //       var title = (
  //         <Row>
  //           <i className="fa fa-hashtag" />
  //           <Gutter />
  //           <span>{ room.name } ({ room.users.length })</span>
  //         </Row>
  //       )
  //
  //       return (
  //         <Tab key={index} title={title}>
  //           <Row>
  //             <Column flex="3">
  //               <ScrollView>
  //                 <List>
  //                   { room.users.sortBy(u => u.user).map(user => <ListItem key={user.user}><span><strong>{ user.user }</strong><br /><small className="text-muted">{ user.tickers }</small></span></ListItem>) }
  //                 </List>
  //               </ScrollView>
  //             </Column>
  //             <Divider vertical />
  //             <Column flex="9">
  //               <ScrollView>
  //                 <Chat messages={room.messages} />
  //               </ScrollView>
  //             </Column>
  //           </Row>
  //         </Tab>
  //       )
  //     case 'search':
  //       const matches = this.state.searches.get(props.ticket)
  //
  //       const renderMatch = function (match, index) {
  //         return match.results.map((r, index) => <tr key={index}>
  //           <td><strong>{ match.user }</strong></td>
  //           <td>
  //             { Path.basename(r.filename.replace(/\\/g, '/')) }
  //           </td>
  //           <td>
  //             { Path.dirname(r.filename.replace(/\\/g, '/')) }
  //           </td>
  //           <td>
  //             { r.size }
  //           </td>
  //         </tr>)
  //       }
  //
  //       var title = (<Row><i className="fa fa-search" />
  //         <Gutter /><span>{ props.query } ({ matches.map(m => m.results.length).toArray().sum() })</span></Row>)
  //
  //       return (
  //         <Tab key={index} title={title}>
  //           <ScrollView>
  //             <table>
  //               { matches.map(renderMatch) }
  //             </table>
  //           </ScrollView>
  //         </Tab>
  //       )
  //   }
  // }

  render() {
    return (
      <AppContainer>
        <Column>
          <TopToolbar />
          <Row>
            <Column style={{ flex: 9 }}>
              <Row style={{ flex: 10 }}>
                {/* <TabSet> */}
                {/* { this.tabs.map(this.renderTab) } */}
                {/* </TabSet> */}
              </Row>
              <Divider />
            </Column>
            <Divider vertical />
            <Column style={{ flex: 3 }}>
              <UsersPanel />
              <Divider />
              <RoomPanel />
            </Column>
          </Row>
          <TransfersPanel />
        </Column>
      </AppContainer>
    )
  }

  // onConnected = (client) => {
  //   this.setState({
  //     isConnected: true
  //   })
  //   return this.state.manager.client.login(process.env.USERNAME, process.env.PASSWORD)
  // }
  //
  // onSayInChatRoom = (reply) => {
  //   return this.setState(state => ({
  //     joinedRooms: state.joinedRooms.update(reply.room, room => room.update('messages', messages => messages.push({
  //       type: 'message',
  //       username: reply.username,
  //       message: reply.message,
  //       timestamp: Date.now()
  //     })))
  //   }))
  // }
  //
  // onUserJoinedRoom = (reply) => {
  //   return this.setState(state => ({
  //     joinedRooms: state.joinedRooms.update(reply.room, room => room.update('messages', messages => messages.push({
  //       type: 'joined',
  //       username: reply.username,
  //       timestamp: Date.now()
  //     })))
  //   }))
  // }
  //
  // onUserLeftRoom = (reply) => {
  //   return this.setState(state => ({
  //     joinedRooms: state.joinedRooms.update(reply.room, room => room.update('messages', messages => messages.push({
  //       type: 'left',
  //       username: reply.username,
  //       timestamp: Date.now()
  //     })))
  //   }))
  // }
  //
  // onJoinRoom = (reply) => {
  // }
  //
  // onRoomTickers = (reply) => {
  //   return this.setState(state => ({
  //     joinedRooms: state.joinedRooms.update(reply.room, room => room.set('users', reply.users))
  //   }))
  // }
  //
  // onGetUserStats = (reply) => {
  // }
  //
  // onLogin = (payload) => {
  //   return this.setState({
  //     isLoggedIn: payload.success
  //   })
  // }
  //
  // onGetStatus = (reply) => {
  // }
  //
  // onPriviledgedUsers = (reply) => {
  //   return this.setState({
  //     users: Immutable.List(reply.users)
  //   })
  // }
  //
  // onPrivateMessages = (reply) => {
  // }
  // onUserJoinedRoom = (reply) => {
  // }
  //
  // onConnectToPeer = (reply) => {
  //   return this.state.manager.peers[reply.username].on('search reply', this.onSearchReply)
  // }
  //
  // onSearchReply = (reply) => {
  //   return this.setState(state => ({
  //     searches: state.searches.update(reply.ticket, matches => (matches != null ? matches.push(reply) : void 0))
  //   }))
  // }
  //
  // onRoomList = (rooms) => {
  //   return this.setState({
  //     rooms: Immutable.List(rooms)
  //   })
  // }
  //
  // performSearch = (query) => {
  //   const ticket = support.ticket()
  //   return this.setState(state => ({
  //     searches: state.searches.set(ticket, Immutable.List())
  //   }), () => {
  //     this.pushTab({
  //       type: 'search',
  //       ticket,
  //       query
  //     })
  //     return this.state.manager.client.fileSearch(query, ticket)
  //   })
  // }
}
