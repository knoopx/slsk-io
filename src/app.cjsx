React = require("react")
Immutable = require("immutable")
Path = require("path")

UI = require("./ui")
{Button} = UI.Buttons
{ScrollView, TabView} = UI.View
{TabSet, Tab} = TabView
{Row, Column, Divider, Gutter} = UI.Layout
{List, ListItem} = UI.List
{TopToolbar, TransfersPanel, UsersPanel, RoomPanel, Chat} = require("./app/root")

support = require("./support")

module.exports = React.createClass
  displayName: "App"

  pushTab: (tab, fn) ->
    @setState (state) ->
      tabs: state.tabs.concat(tab)
    , fn

  componentDidMount: ->
    module.onReload? =>
      window.previousAppState = @state

    @state.manager.on 'connect', @onConnected
    #@state.manager.client.on 'message', (message) -> console.log(message._message.name, message)
    @state.manager.client.on 'login', @onLogin
    @state.manager.client.on "connect to peer", @onConnectToPeer
    @state.manager.client.on 'get status', @onGetStatus
    @state.manager.client.on 'privileged users', @onPriviledgedUsers
    @state.manager.client.on 'private messages', @onPrivateMessages
    @state.manager.client.on 'room list', @onRoomList
    @state.manager.client.on 'join room', @onJoinRoom
    @state.manager.client.on 'room tickers', @onRoomTickers
    @state.manager.client.on 'user joined room', @onUserJoinedRoom
    @state.manager.client.on 'say in chat room', @onSayInChatRoom
    @state.manager.client.on 'user left room', @onUserLeftRoom
    @state.manager.client.on 'get user stats', @onGetUserStats

  getInitialState: ->
    window.previousAppState || @props.state

  renderTab: (props, index) ->
    switch props.type
      when "chatroom"
        room = @state.joinedRooms.get(props.name)
        title = <Row>
          <i className="fa fa-hashtag" />
          <Gutter/>
          <i/>
          <span>{room.name} ({room.users.count()})</span>
        </Row>

        <Tab key={index} title={title}>
          <Row>
            <Column flex="3">
              <ScrollView>
                <List>
                  {room.users.sortBy((u) -> u.user).map (user) -> <ListItem key={user.user}><span><strong>{user.user}</strong><br/><small className="text-muted">{user.tickers}</small></span></ListItem>}
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

        </Tab>
      when "search"
        matches = @state.searches.get(props.ticket)

        renderMatch = (match, index) ->
          match.results.map (r, index) ->
              <tr key={index}>
                <td><strong>{match.user}</strong></td>
                <td>{Path.basename(r.filename.replace(/\\/g, "/"))}</td>
                <td>{Path.dirname(r.filename.replace(/\\/g, "/"))}</td>
                <td >{r.size}</td>
              </tr>

        title = <Row>
          <i className="fa fa-search" />
          <Gutter/>
          <span>{props.query} ({matches.map((m) -> m.results.length).toArray().sum()})</span>
        </Row>

        <Tab key={index} title={title}>
          <ScrollView>
            <table>{matches.map(renderMatch)}</table>
          </ScrollView>
        </Tab>

  render: ->
    <Column>
      <TopToolbar isConnected={@state.isConnected} onSearch={@performSearch} />
      <Row>
        <Column flex={9}>
          <Row flex={10}>
            <TabSet>{@state.tabs.map(@renderTab)}</TabSet>
          </Row>
          <Divider />
        </Column>
        <Divider vertical />
        <Column flex={3}>
          <UsersPanel users={@state.users} />
          <Divider />
          <RoomPanel rooms={@state.rooms} onSelect={@joinRoom} />
        </Column>
      </Row>
      <TransfersPanel />
    </Column>

  onConnected: (client) ->
    @setState(isConnected: true)
    @state.manager.client.login(process.env["USERNAME"], process.env["PASSWORD"])

  onSayInChatRoom: (reply) ->
    # {room: "indie", username: "qoncept", message: "niq, I wouldn't wipe my cat's ass with your retarded juvenile links you crummy alcoholic fuck", _message: Message}
    @setState (state) ->
      joinedRooms: state.joinedRooms.update reply.room, (room) ->
        room.update "messages", (messages) -> messages.push(type: "message", username: reply.username, message: reply.message, timestamp: Date.now())

  onUserJoinedRoom: (reply) ->
    # Object {room: "indie", username: "knoopx", status: 2, avgspeed: 443446, downloadnum: 149…}_message: Messageavgspeed: 443446countryCode: "ES"dirs: 9648downloadnum: 149files: 104425room: "indie"slotsfree: 0status: 2username: "knoopx"__proto__: Object
    @setState (state) ->
      joinedRooms: state.joinedRooms.update reply.room, (room) ->
        room.update "messages", (messages) -> messages.push(type: "joined", username: reply.username, timestamp: Date.now())

  onUserLeftRoom: (reply) ->
    #  Object {room: "indie", username: "Machinead O'Connor", _message: Message}
    @setState (state) ->
      joinedRooms: state.joinedRooms.update reply.room, (room) ->
        room.update "messages", (messages) -> messages.push(type: "left", username: reply.username, timestamp: Date.now())

  onJoinRoom: (reply) ->
    #  Object {room: "indie", username: "Machinead O'Connor", _message: Message}

  onRoomTickers: (reply) ->
    @setState (state) ->
      joinedRooms: state.joinedRooms.update reply.room, (room) ->
        room.set "users", reply.users

  onGetUserStats: (reply) ->
    # get user stats Object {username: "Eddie Monsoon", avgspeed: 0, downloadnum: 0, files: 0, dirs: 11…}_message: Messageavgspeed: 0dirs: 11downloadnum: 0files: 0username: "Eddie Monsoon"__proto__: Object

  onLogin: (payload) ->
    # payload.success, payload.greet
    @setState(isLoggedIn: payload.success)

  onGetStatus: (reply) ->

  onPriviledgedUsers: (reply) ->
    @setState(users: Immutable.List(reply.users))

  onPrivateMessages: (reply) ->

  onUserJoinedRoom: (reply) ->

  onConnectToPeer: (reply) ->
    # connect to peer Object {userdisplayName: "Solaris510", type: "P", ip: "76.21.90.150", port: 49421, token: 36619…}_message: Messageip: "76.21.90.150"port: 49421privileged: 0token: 36619type: "P"userdisplayName: "Solaris510"__proto__: Object
    #@state.manager.peers[reply.username].on 'message', (message) -> console.log(message._message.name, message)
    @state.manager.peers[reply.username].on 'search reply', @onSearchReply

  onSearchReply: (reply) ->
    @setState (state) ->
      searches: state.searches.update reply.ticket, (matches) ->
        matches?.push(reply)

  onRoomList: (rooms) ->
    @setState(rooms: Immutable.List(rooms))

  # ACTIONS

  performSearch: (query) ->
    ticket = support.ticket()

    @setState (state) ->
      searches: state.searches.set(ticket, Immutable.List())
    , =>
      @pushTab type: "search", ticket: ticket, query: query
      @state.manager.client.fileSearch(query, ticket)

  joinRoom: (room) ->
    unless @state.joinedRooms.get(room.name)
      @setState (state) ->
        joinedRooms: state.joinedRooms.set(room.name, new Immutable.Record(name: room.name, messages: Immutable.List(), users: Immutable.Map())())
      , =>
        @pushTab type: "chatroom", name: room.name
        @state.manager.client.joinRoom(room.name)
