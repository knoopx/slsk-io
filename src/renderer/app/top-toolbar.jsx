import React from 'react'
import { Toolbar, Buttons, Layout } from '../ui'

const { Button } = Buttons
const { Column, Gutter } = Layout

export default class TopToolbar extends React.Component {
  static propTypes = {
    isConnected: React.PropTypes.bool
  }

  static defaultProps = {
    isConnected: false
  }

  render() {
    return (<Toolbar>
      <Column>
        <div className="input-group"><i className="fa fa-search" />
          <Gutter />
          <input placeholder="Search" onKeyDown={this.onKeyDown} />
        </div>
      </Column>
      <Gutter size={15.0} />
      <Button>
        { this.props.isConnected ? 'Connected' : 'Disconnected' }
      </Button>
      <Gutter size={5.0} />
      <Button><i className="fa fa-cog" /></Button>
    </Toolbar>)
  }

  onKeyDown = (e) => {
    if (!e.defaultPrevented) {
      switch (e.key) {
        case 'Enter':
          this.props.onSearch(e.target.value)
          e.target.value = ''
          return e.preventDefault()
      }
    }
  }
}
