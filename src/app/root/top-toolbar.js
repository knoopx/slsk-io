// Generated by CoffeeScript 1.10.0
let Column;

let Divider;
let Gutter;
let Row;
let ref;

import React from "react";
import UI from "../../ui";
const Toolbar = UI.Toolbar;
const Button = UI.Buttons.Button;

ref = UI.Layout, Row = ref.Row, Column = ref.Column, Divider = ref.Divider, Gutter = ref.Gutter;

export default class extends React.Component {
  static displayName = "TopToolbar";

  static propTypes = {
    isConnected: React.PropTypes.bool,
  };

  render() {
    return <Toolbar><Column><div className="input-group"><i className="fa fa-search" /><Gutter /><input placeholder="Search" onKeyDown={this.onKeyDown} /></div></Column><Gutter size={15.} /><Button>{this.props.isConnected ? "Connected" : "Disconnected"}</Button><Gutter size={5.} /><Button><i className="fa fa-cog" /></Button></Toolbar>;
  }

  onKeyDown = (e) => {
    if (!e.defaultPrevented) {
      switch (e.key) {
        case "Enter":
          this.props.onSearch(e.target.value);
          e.target.value = "";
          return e.preventDefault();
      }
    }
  };
};
