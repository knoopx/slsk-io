// Generated by CoffeeScript 1.10.0
var Chat, Column, Divider, Gutter, List, ListItem, RoomPanel, Row, ScrollView, Tab, TabSet, TabView, TopToolbar, TransfersPanel, UsersPanel, ref, ref1, ref2, ref3;

import React from "react";
import Immutable from "immutable";
import Path from "path";
import UI from "./ui";
var Button = UI.Buttons.Button;

ref = UI.View, ScrollView = ref.ScrollView, TabView = ref.TabView;

TabSet = TabView.TabSet, Tab = TabView.Tab;

ref1 = UI.Layout, Row = ref1.Row, Column = ref1.Column, Divider = ref1.Divider, Gutter = ref1.Gutter;

ref2 = UI.List, List = ref2.List, ListItem = ref2.ListItem;

ref3 = require("./app/root"), TopToolbar = ref3.TopToolbar, TransfersPanel = ref3.TransfersPanel, UsersPanel = ref3.UsersPanel, RoomPanel = ref3.RoomPanel, Chat = ref3.Chat;

import support from "./support";

export default React.createClass({
  displayName: "App",
  pushTab(tab, fn) {
    return this.setState(function(state) {
      return {
        tabs: state.tabs.concat(tab)
      };
    }, fn);
  },
  componentDidMount() {
    if (typeof module.onReload === "function") {
      module.onReload(() => {
        return window.previousAppState = this.state;
      });
    }
    this.state.manager.on('connect', this.onConnected);
    this.state.manager.client.on('login', this.onLogin);
    this.state.manager.client.on("connect to peer", this.onConnectToPeer);
    this.state.manager.client.on('get status', this.onGetStatus);
    this.state.manager.client.on('privileged users', this.onPriviledgedUsers);
    this.state.manager.client.on('private messages', this.onPrivateMessages);
    this.state.manager.client.on('room list', this.onRoomList);
    this.state.manager.client.on('join room', this.onJoinRoom);
    this.state.manager.client.on('room tickers', this.onRoomTickers);
    this.state.manager.client.on('user joined room', this.onUserJoinedRoom);
    this.state.manager.client.on('say in chat room', this.onSayInChatRoom);
    this.state.manager.client.on('user left room', this.onUserLeftRoom);
    return this.state.manager.client.on('get user stats', this.onGetUserStats);
  },
  getInitialState() {
    return window.previousAppState || this.props.state;
  },
  renderTab(props, index) {
    switch (props.type) {
      case "chatroom":
        var room = this.state.joinedRooms.get(props.name);

        var title = React.createElement(Row, null, React.createElement("i", {
          "className": "fa fa-hashtag"
        }), React.createElement(Gutter, null), React.createElement("i", null), React.createElement("span", null, room.name, " (", room.users.count(), ")"));

        return React.createElement(Tab, {
          "key": index,
          "title": title
        }, React.createElement(Row, null, React.createElement(Column, {
          "flex": "3"
        }, React.createElement(ScrollView, null, React.createElement(List, null, room.users.sortBy(function(u) {
          return u.user;
        }).map(function(user) {
          return React.createElement(ListItem, {
            "key": user.user
          }, React.createElement("span", null, React.createElement("strong", null, user.user), React.createElement("br", null), React.createElement("small", {
            "className": "text-muted"
          }, user.tickers)));
        })))), React.createElement(Divider, {
          "vertical": true
        }), React.createElement(Column, {
          "flex": "9"
        }, React.createElement(ScrollView, null, React.createElement(Chat, {
          "messages": room.messages
        })))));
      case "search":
        var matches = this.state.searches.get(props.ticket);

        var renderMatch = function(match, index) {
          return match.results.map(function(r, index) {
            return React.createElement("tr", {
              "key": index
            }, React.createElement("td", null, React.createElement("strong", null, match.user)), React.createElement("td", null, Path.basename(r.filename.replace(/\\/g, "/"))), React.createElement("td", null, Path.dirname(r.filename.replace(/\\/g, "/"))), React.createElement("td", null, r.size));
          });
        };

        var title = React.createElement(Row, null, React.createElement("i", {
          "className": "fa fa-search"
        }), React.createElement(Gutter, null), React.createElement("span", null, props.query, " (", matches.map(function(m) {
          return m.results.length;
        }).toArray().sum(), ")"));

        return React.createElement(Tab, {
          "key": index,
          "title": title
        }, React.createElement(ScrollView, null, React.createElement("table", null, matches.map(renderMatch))));
    }
  },
  render() {
    return React.createElement(Column, null, React.createElement(TopToolbar, {
      "isConnected": this.state.isConnected,
      "onSearch": this.performSearch
    }), React.createElement(Row, null, React.createElement(Column, {
      "flex": 9.
    }, React.createElement(Row, {
      "flex": 10.
    }, React.createElement(TabSet, null, this.state.tabs.map(this.renderTab))), React.createElement(Divider, null)), React.createElement(Divider, {
      "vertical": true
    }), React.createElement(Column, {
      "flex": 3.
    }, React.createElement(UsersPanel, {
      "users": this.state.users
    }), React.createElement(Divider, null), React.createElement(RoomPanel, {
      "rooms": this.state.rooms,
      "onSelect": this.joinRoom
    }))), React.createElement(TransfersPanel, null));
  },
  onConnected(client) {
    this.setState({
      isConnected: true
    });
    return this.state.manager.client.login(process.env["USERNAME"], process.env["PASSWORD"]);
  },
  onSayInChatRoom(reply) {
    return this.setState(function(state) {
      return {
        joinedRooms: state.joinedRooms.update(reply.room, function(room) {
          return room.update("messages", function(messages) {
            return messages.push({
              type: "message",
              username: reply.username,
              message: reply.message,
              timestamp: Date.now()
            });
          });
        })
      };
    });
  },
  onUserJoinedRoom(reply) {
    return this.setState(function(state) {
      return {
        joinedRooms: state.joinedRooms.update(reply.room, function(room) {
          return room.update("messages", function(messages) {
            return messages.push({
              type: "joined",
              username: reply.username,
              timestamp: Date.now()
            });
          });
        })
      };
    });
  },
  onUserLeftRoom(reply) {
    return this.setState(function(state) {
      return {
        joinedRooms: state.joinedRooms.update(reply.room, function(room) {
          return room.update("messages", function(messages) {
            return messages.push({
              type: "left",
              username: reply.username,
              timestamp: Date.now()
            });
          });
        })
      };
    });
  },
  onJoinRoom(reply) {},
  onRoomTickers(reply) {
    return this.setState(function(state) {
      return {
        joinedRooms: state.joinedRooms.update(reply.room, function(room) {
          return room.set("users", reply.users);
        })
      };
    });
  },
  onGetUserStats(reply) {},
  onLogin(payload) {
    return this.setState({
      isLoggedIn: payload.success
    });
  },
  onGetStatus(reply) {},
  onPriviledgedUsers(reply) {
    return this.setState({
      users: Immutable.List(reply.users)
    });
  },
  onPrivateMessages(reply) {},
  onUserJoinedRoom(reply) {},
  onConnectToPeer(reply) {
    return this.state.manager.peers[reply.username].on('search reply', this.onSearchReply);
  },
  onSearchReply(reply) {
    return this.setState(function(state) {
      return {
        searches: state.searches.update(reply.ticket, function(matches) {
          return matches != null ? matches.push(reply) : void 0;
        })
      };
    });
  },
  onRoomList(rooms) {
    return this.setState({
      rooms: Immutable.List(rooms)
    });
  },
  performSearch(query) {
    var ticket = support.ticket();
    return this.setState(function(state) {
      return {
        searches: state.searches.set(ticket, Immutable.List())
      };
    }, () => {
      this.pushTab({
        type: "search",
        ticket: ticket,
        query: query
      });
      return this.state.manager.client.fileSearch(query, ticket);
    });
  },
  joinRoom(room) {
    if (!this.state.joinedRooms.get(room.name)) {
      return this.setState(function(state) {
        return {
          joinedRooms: state.joinedRooms.set(room.name, new Immutable.Record({
            name: room.name,
            messages: Immutable.List(),
            users: Immutable.Map()
          })())
        };
      }, () => {
        this.pushTab({
          type: "chatroom",
          name: room.name
        });
        return this.state.manager.client.joinRoom(room.name);
      });
    }
  }
});
