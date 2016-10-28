// Generated by CoffeeScript 1.10.0
var Column, Divider, Gutter, List, ListItem, Row, ref, ref1;

import React from "react";
import Immutable from "immutable";
import ImmutablePropTypes from 'react-immutable-proptypes';
import UI from "../../ui";
var Toolbar = UI.Toolbar;

ref = UI.Layout, Row = ref.Row, Column = ref.Column, Divider = ref.Divider, Gutter = ref.Gutter;

ref1 = UI.List, List = ref1.List, ListItem = ref1.ListItem;

var ScrollView = UI.View.ScrollView;

export default React.createClass({
  displayName: "RoomPanel",
  propTypes: {
    rooms: ImmutablePropTypes.list,
    onSelect: React.PropTypes.func
  },
  getInitialState() {
    return {
      rooms: this.props.rooms
    };
  },
  componentWillReceiveProps(nextProps) {
    return this.setRooms(nextProps.rooms);
  },
  setRooms(rooms, fn) {
    if (rooms != null) {
      return this.setState({
        rooms: rooms
      }, fn);
    }
  },
  render() {
    return React.createElement(Column, null, React.createElement(Toolbar, null, "Rooms (", this.state.rooms.count(), ")"), React.createElement(ScrollView, null, React.createElement(List, null, this.state.rooms.sortBy(function(r) {
      return -r.users;
    }).map(this.renderItem))));
  },
  renderItem(room) {
    return React.createElement(ListItem, {
      "key": room.name,
      "onClick": (() => {
        return this.props.onSelect(room);
      })
    }, room.name, " (", room.users, ")");
  }
});
