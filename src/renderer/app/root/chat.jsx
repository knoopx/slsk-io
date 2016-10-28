import React from 'react'
import UI from '../../ui'

let Column

let Divider
let Gutter
let List
let ListItem
let Row
let ref
let ref1


ref = UI.Layout, Row = ref.Row, Column = ref.Column, Divider = ref.Divider, Gutter = ref.Gutter

ref1 = UI.List, List = ref1.List, ListItem = ref1.ListItem

const ScrollView = UI.View.ScrollView

export default class extends React.Component {
  static displayName = 'Chat'

  render() {
    return (<List>
      { this.props.messages.map(this.renderMessage) }
    </List>)
  }

  renderMessage = (message, index) => {
    return (<ListItem key={index}>
      <Row>
        <Column flex="2" style={{ textAlign: 'right' }}><strong>{ message.username }</strong></Column>
        <Gutter />
        <Column flex="10">
          { message.message }
        </Column>
      </Row>
    </ListItem>)
  }
}
