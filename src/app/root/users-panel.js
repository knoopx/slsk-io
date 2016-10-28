// Generated by CoffeeScript 1.10.0
let Column, Divider, Gutter, List, ListItem, Row, ref, ref1;

import React from "react";
import UI from "../../ui";
const Toolbar = UI.Toolbar;

ref = UI.Layout, Row = ref.Row, Column = ref.Column, Divider = ref.Divider, Gutter = ref.Gutter;

ref1 = UI.List, List = ref1.List, ListItem = ref1.ListItem;

const ScrollView = UI.View.ScrollView;
const Button = UI.Buttons.Button;

export default React.createClass({
  displayName: "UsersPanel",

  render() {
    return React.createElement(Column, null, React.createElement(Toolbar, null, React.createElement(
      Row,
      {
        "alignItems": "center",
      },
      React.createElement(Column, null, React.createElement("span", null, "Users (", this.props.users.count(), ")")),
      React.createElement(Button, null, React.createElement(
        "i",
        {
          "className": "fa fa-plus",
        },
      )),
    )), React.createElement(ScrollView, null, React.createElement(List, null, this.props.users.sort().map(user => React.createElement(
      ListItem,
      {
        "key": user,
      },
      user,
    )))));
  },
});
