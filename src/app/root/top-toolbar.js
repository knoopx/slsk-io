// Generated by CoffeeScript 1.10.0
var Column, Divider, Gutter, Row, ref;

import React from "react";
import UI from "../../ui";
var Toolbar = UI.Toolbar;
var Button = UI.Buttons.Button;

ref = UI.Layout, Row = ref.Row, Column = ref.Column, Divider = ref.Divider, Gutter = ref.Gutter;

export default React.createClass({
  displayName: "TopToolbar",
  propTypes: {
    isConnected: React.PropTypes.bool
  },
  render() {
    return React.createElement(Toolbar, null, React.createElement(Column, null, React.createElement("div", {
      "className": "input-group"
    }, React.createElement("i", {
      "className": "fa fa-search"
    }), React.createElement(Gutter, null), React.createElement("input", {
      "placeholder": "Search",
      "onKeyDown": this.onKeyDown
    }))), React.createElement(Gutter, {
      "size": 15.
    }), React.createElement(Button, null, (this.props.isConnected ? "Connected" : "Disconnected")), React.createElement(Gutter, {
      "size": 5.
    }), React.createElement(Button, null, React.createElement("i", {
      "className": "fa fa-cog"
    })));
  },
  onKeyDown(e) {
    if (!e.defaultPrevented) {
      switch (e.key) {
        case "Enter":
          this.props.onSearch(e.target.value);
          e.target.value = "";
          return e.preventDefault();
      }
    }
  }
});
