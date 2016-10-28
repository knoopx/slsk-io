import React from 'react'
import { Toolbar, Layout } from '../ui'
const { Row, Column, Divider } = Layout

export default class TransfersPanel extends React.Component {

  render() {
    return (<Row flex={2.0}>
      <Column>
        <Toolbar>Downloads</Toolbar>
      </Column>
      <Divider vertical />
      <Column>
        <Toolbar>Uploads</Toolbar>
      </Column>
    </Row>)
  }
}
