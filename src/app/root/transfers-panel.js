// Generated by CoffeeScript 1.10.0
let Column

let Divider
let Gutter
let Row
let ref

import React from "react"
import UI from "../../ui"
const Toolbar = UI.Toolbar

ref = UI.Layout, Row = ref.Row, Column = ref.Column, Divider = ref.Divider, Gutter = ref.Gutter

export default class extends React.Component {
  static displayName = "TransfersPanel"

  render() {
    return <Row flex={2.}><Column><Toolbar>Downloads</Toolbar></Column><Divider vertical={true} /><Column><Toolbar>Uploads</Toolbar></Column></Row>
  }
}
