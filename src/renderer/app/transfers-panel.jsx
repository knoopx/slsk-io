import React from 'react'
import { Toolbar, Layout } from '../ui'

const { Row, Column, Divider } = Layout

export default class TransfersPanel extends React.Component {
  render() {
    return (
      <Row style={{ flex: 2 }}>
        <Column>
          <Toolbar>Downloads</Toolbar>
        </Column>
        <Divider vertical />
        <Column>
          <Toolbar>Uploads</Toolbar>
        </Column>
      </Row>
    )
  }
}
