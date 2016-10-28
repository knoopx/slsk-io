// Generated by CoffeeScript 1.10.0
let Column, Divider, Gutter, Row, ref;

import React from "react";
import UI from "../../ui";
const Toolbar = UI.Toolbar;

ref = UI.Layout, Row = ref.Row, Column = ref.Column, Divider = ref.Divider, Gutter = ref.Gutter;

export default React.createClass({
  displayName: "TransfersPanel",

  render() {
    return React.createElement(
      Row,
      {
        "flex": 2.,
      },
      React.createElement(Column, null, React.createElement(Toolbar, null, "Downloads")),
      React.createElement(
        Divider,
        {
          "vertical": true,
        },
      ),
      React.createElement(Column, null, React.createElement(Toolbar, null, "Uploads")),
    );
  },
});
