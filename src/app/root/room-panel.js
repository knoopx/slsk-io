// Generated by CoffeeScript 1.10.0
var Column, Divider, Gutter, Immutable, ImmutablePropTypes, List, ListItem, React, Row, ScrollView, Toolbar, UI, ref, ref1;

React = require("react");

Immutable = require("immutable");

ImmutablePropTypes = require('react-immutable-proptypes');

UI = require("../../ui");

Toolbar = UI.Toolbar;

ref = UI.Layout, Row = ref.Row, Column = ref.Column, Divider = ref.Divider, Gutter = ref.Gutter;

ref1 = UI.List, List = ref1.List, ListItem = ref1.ListItem;

ScrollView = UI.View.ScrollView;

module.exports = React.createClass({
  displayName: "RoomPanel",
  propTypes: {
    rooms: ImmutablePropTypes.list,
    onSelect: React.PropTypes.func
  },
  getInitialState: function() {
    return {
      rooms: this.props.rooms
    };
  },
  componentWillReceiveProps: function(nextProps) {
    return this.setRooms(nextProps.rooms);
  },
  setRooms: function(rooms, fn) {
    if (rooms != null) {
      return this.setState({
        rooms: rooms
      }, fn);
    }
  },
  render: function() {
    return React.createElement(Column, null, React.createElement(Toolbar, null, "Rooms (", this.state.rooms.count(), ")"), React.createElement(ScrollView, null, React.createElement(List, null, this.state.rooms.sortBy(function(r) {
      return -r.users;
    }).map(this.renderItem))));
  },
  renderItem: function(room) {
    return React.createElement(ListItem, {
      "key": room.name,
      "onClick": (() => {
        return this.props.onSelect(room);
      })
    }, room.name, " (", room.users, ")");
  }
});
