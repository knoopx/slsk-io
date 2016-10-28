import React from 'react'
import { Toolbar, Lists, Buttons, Layout, View } from '../ui'
const { Button } = Buttons
const { List, ListItem } = Lists
const { ScrollView } = View
const { Row, Column } = Layout

export default class UsersPanel extends React.Component {
  render() {
    return (
      <Column>
        <Toolbar>
          <Row alignItems="center">
            <Column><span>Users ({this.props.users.count()})</span></Column>
            <Button><i className="fa fa-plus" /></Button>
          </Row>
        </Toolbar>
        <ScrollView>
          <List>
            {this.props.users.sort().map(user => <ListItem key={user}>{user}</ListItem>)}
          </List>
        </ScrollView>
      </Column>
    )
  }
}
