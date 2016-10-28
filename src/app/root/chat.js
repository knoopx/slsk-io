// Generated by CoffeeScript 1.10.0
let Column, Divider, Gutter, List, ListItem, Row, ref, ref1;

import React from "react";
import UI from "../../ui";

ref = UI.Layout, Row = ref.Row, Column = ref.Column, Divider = ref.Divider, Gutter = ref.Gutter;

ref1 = UI.List, List = ref1.List, ListItem = ref1.ListItem;

const ScrollView = UI.View.ScrollView;

export default React.createClass({
  displayName: "Chat",

  render() {
    return React.createElement(List, null, this.props.messages.map(this.renderMessage));
  },

  renderMessage(message, index) {
    return React.createElement(
      ListItem,
      {
        "key": index,
      },
      React.createElement(Row, null, React.createElement(
        Column,
        {
          "flex": "2",

          "style": {
            textAlign: "right",
          },
        },
        React.createElement("strong", null, message.username),
      ), React.createElement(Gutter, null), React.createElement(
        Column,
        {
          "flex": "10",
        },
        message.message,
      )),
    );
  },
});
