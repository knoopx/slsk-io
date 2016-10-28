import React from 'react'
import Immutable from 'immutable'

export default class extends React.Component {
  static displayName = 'Test'
  state = this.props.state

  render() {
    return <div>{this.state.value}</div>
  }
}
