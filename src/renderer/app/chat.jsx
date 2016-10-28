import React from 'react'
import { Lists, Layout } from '../ui'

const { List, ListItem } = Lists
const { Row, Column, Gutter } = Layout

export default class Chat extends React.Component {
  render() {
    return (
      <List>
        { this.props.messages.map(this.renderMessage) }
      </List>
    )
  }

  renderMessage = (message, index) => (
    <ListItem key={index}>
      <Row>
        <Column style={{ flex: 2, textAlign: 'right' }}><strong>{ message.username }</strong></Column>
        <Gutter />
        <Column style={{ flex: 10 }}>
          { message.message }
        </Column>
      </Row>
    </ListItem>
    )
}
